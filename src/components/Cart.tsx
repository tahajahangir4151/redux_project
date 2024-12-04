import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Trash2, Minus, Plus } from 'lucide-react';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(0, item.quantity - 1),
                        })
                      )
                    }
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;