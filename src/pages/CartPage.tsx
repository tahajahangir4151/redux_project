import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 transition-colors duration-200"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />
                <div className="ml-6 flex-grow">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(0, item.quantity - 1),
                          })
                        )
                      }
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4 dark:text-white" />
                    </button>
                    <span className="mx-4 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 dark:text-white" />
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
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24 transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="font-semibold dark:text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="font-semibold dark:text-white">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold dark:text-white">Total</span>
                  <span className="text-lg font-bold dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;