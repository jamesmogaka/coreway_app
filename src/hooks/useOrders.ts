import { useState, useEffect } from 'react';
import { getOrders } from '../lib/orders';

// Shape of data for an order item from Supabase
interface OrderItemFromDB {
    quantity: number;
    unit_price: number;
}

// Shape of data for an order from Supabase
interface OrderFromDB {
  id: string;
  is_paid: boolean;
  status: 'pending' | 'shipped' | 'delivered';
  order_items: OrderItemFromDB[];
  delivery_address: string;
  user_id?: string;
  created_at: string;
}


// Shape of data used in the application components
export interface Order {
  id: string;
  paid: boolean;
  status: 'pending' | 'shipped' | 'delivered';
  total: number;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        if (response.success && response.data) {
          const transformedOrders = (response.data as OrderFromDB[]).map(order => {
            const total = order.order_items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
            return {
              id: order.id,
              paid: order.is_paid,
              status: order.status,
              total: total,
            };
          });
          setOrders(transformedOrders);
        } else {
          const errorMessage = typeof response.error === 'string' ? response.error : (response.error as Error)?.message || 'Failed to fetch orders';
          throw new Error(errorMessage);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
}
