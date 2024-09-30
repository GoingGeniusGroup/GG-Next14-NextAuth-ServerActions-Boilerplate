import React from 'react';
import { OrderStatus } from '@prisma/client';

// Define colors for each status
const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-500 text-white',
  [OrderStatus.SHIPPED]: 'bg-blue-500 text-white',
  [OrderStatus.DELIVERED]: 'bg-green-500 text-white',
  [OrderStatus.CANCELLED]: 'bg-red-500 text-white',
};

interface OrderStatusCellProps {
  status: OrderStatus;
}

const OrderStatusCell: React.FC<OrderStatusCellProps> = ({ status }) => {
  return (
    <td className="px-4 py-2">
      <span className={`px-2 py-1 rounded-full ${statusColors[status]}`}>
        {status}
      </span>
    </td>
  );
};

export default OrderStatusCell;
