import { Order } from '@/lib/types/order';
import React from 'react';

interface OrderProps {
  order: Order;
}

const OrderComponent: React.FC<OrderProps> = ({ order }) => {
  const formattedDate = new Date(order.created_at).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      <div className="flex bg-ct-dark-100 border p-4 rounded-lg space-x-4">
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-100 border p-2">
          <img
            src="/icons/food-icon.svg"
            alt="Ícone de comida"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between items-center mb-2">
            <p className="text-md font-semibold text-gray-600">
              Pedido {/* Geração de um número aleatório para o pedido */}
            </p>
            {/* <p className="text-sm text-gray-400">{formattedDate}</p> */}
          </div>

          <p className="whitespace-pre-wrap text-sm text-gray-500">
            Pedido: {order.description}. Aguardando o preparo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
