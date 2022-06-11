/*
we are storing car items in an array.Cart items is a specific set of data in an array.
But what is that data? if we remember inside of cart actions, our cart item is the
first time where we actually create this actual cart item.
And what it is, is all of the properties of the product that we're adding in, 
plus a quantity value,which is a number.

Now, if you think about the category item, it has all these properties we want, 
but it just missing the quantity.So here we can make an intersection type of item 
which is equal to category item, plus this additional
quantity field that we're looking for, which is a number.
*/

import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES  {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_CART_COUNT = 'cart/SET_CART_COUNT',
  SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
};

export type CartItem = CategoryItem & {
  quantity :  number;
}