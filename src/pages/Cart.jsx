import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [percentageDiscount, setPercentageDiscount] = useState('');

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate discount
  const discountAmount = percentageDiscount
    ? (subtotal * Number(percentageDiscount)) / 100
    : 0;

  // Calculate final price
  const finalPrice = subtotal - discountAmount;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <>
          {/* Table Section with Horizontal Scroll */}
          <div className="overflow-x-auto mb-4">
            <table className="table-auto w-full sm:min-w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          }
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xl"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xl"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-2">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: { id: item.id },
                          })
                        }
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Discount Section */}
          <div className="mb-4">
            <h3 className="text-xl font-bold">Apply Discount</h3>
            <div className="mt-2">
              <input
                type="number"
                placeholder="Enter Discount (%)"
                value={percentageDiscount}
                onChange={(e) => setPercentageDiscount(e.target.value)}
                onFocus={() => setPercentageDiscount('')} // Clear field on focus
                className="border p-2 rounded w-full sm:w-64 mx-auto"
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="border-t pt-4 text-center">
            <p className="text-lg">
              Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span>
            </p>
            <p className="text-lg">
              Discount: <span className="font-bold">${discountAmount.toFixed(2)}</span>
            </p>
            <p className="text-xl font-bold">
              Final Price: <span>${finalPrice.toFixed(2)}</span>
            </p>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <button
              onClick={() => {
                toast.success('Checkout successful!', { autoClose: 2000 });
                dispatch({ type: 'CLEAR_CART' });
              }}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
