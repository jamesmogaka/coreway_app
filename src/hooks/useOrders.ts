import { useState, useEffect, useCallback } from 'react';
import { getOrders } from '../lib/orders';
import type { Order, FetchedOrder, ShippingAddress } from '../types/admin';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOrders();
      if (response.success && response.data) {
        const transformedOrders = (response.data as FetchedOrder[]).map(order => {
          const shippingAddress: ShippingAddress = JSON.parse(order.delivery_address);
          const shippingInfo = `${shippingAddress.firstName} ${shippingAddress.lastName}`;

          return {
            id: order.id,
            shippingInfo: shippingInfo,
            total: order.order_items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0),
            status: order.status,
            date: new Date(order.created_at).toLocaleDateString(),
            items: order.order_items.map(item => ({
              name: item.products?.name || 'Unknown Product',
              quantity: item.quantity,
              price: item.unit_price,
            })),
            isPaid: order.is_paid,
            shippingAddress: shippingAddress,
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
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}
