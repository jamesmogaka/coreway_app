import { createContext, useContext } from 'react';
import type { Order } from '../types/admin';

interface AdminContextType {
  orders: Order[];
  refetchOrders: () => void;
  totalProducts: number;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = AdminContext.Provider;

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
