import { CategoryItem } from '../categories/category.types';

import { CART_ACTION_TYPES , CartItem } from './cart.types';
import { Action , ActionWithPayload, createAction ,withMatcher } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems:CartItem[], productToAdd:CategoryItem):CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems:CartItem[], cartItemToRemove:CartItem): CartItem[] => {
  // find the cart item to remove

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart

  /*
  in this particular case, when you check on this quantity value inside of JavaScript, 
  JavaScript will give you back undefined if there is no existing card item.
  But for us this is not good.We need to actually modify this code so that it works.
  And all we can do is just say if there is an existing card item, then check the quantity.
  Otherwise, don't run this part
  */

  if ( existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

/*
We have now typed out all of our utility functions.
What we want to do next is we want to define each of our actions as a type.*/

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean>;

/*
we need to think about these three actions.
Add item to cart,Remove item from cart and clear item from cart.
Each of these, while being a different action creator, actually does in the end 
create the exact same set cart items action.
So technically, these three are different functions that manufacture the same type 
of action.And here we're just defining the type of action.
And this type of action is our set cart items action.
*/
export type SetCartItems =  ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

//As for these other three, we need to first create this set cart items.Action Creator.
//As for sending action with createaction instead, 
//we can simply replace this with set cart items.Passing in new cart items

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher(
  (boolean:boolean):SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const addItemToCart = withMatcher(
  (cartItems:CartItem[], productToAdd:CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems)
});

export const removeItemFromCart = (cartItems:CartItem[], cartItemToRemove:CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems)
};

export const clearItemFromCart = (cartItems:CartItem[], cartItemToClear:CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems)
};
