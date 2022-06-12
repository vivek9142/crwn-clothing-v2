import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

/*
So here we are inside of our root reducer arou reducer if you hover over it is already 
typed for us.It's of the type reducer.It has a combined state as the return of our 
type where we have all of our different states that come from our respective reducers.

User State category, state and cart state are all states that we have defined as the 
returned stateof each reducer.
So we don't need to type this or we do need to type though is the stored J.S. File.
*/