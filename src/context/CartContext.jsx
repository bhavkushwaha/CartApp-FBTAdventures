import React, { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';


const CartContext = createContext();

const cartReducer = (state, action) => {
  console.log('Dispatch action: ', action);
  
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        toast.info('Cart updated!', { toastId: 'update-cart', autoClose: 1000,});
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      toast.success(`${action.payload.name} added to cart!`, {
  toastId: `add-to-cart-${action.payload.id}`,
});
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }

    case 'REMOVE_FROM_CART': {
      toast.warn('Item removed from cart!', { toastId: `remove-from-cart-${action.payload.id}`, autoClose: 2000,});
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };
    }

    case 'UPDATE_QUANTITY': {
      toast.info('Cart updated!', { toastId: 'update-cart', autoClose: 1000,});
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return <CartContext.Provider value={{ cart: state.cart, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
