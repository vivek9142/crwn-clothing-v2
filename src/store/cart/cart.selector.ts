import { createSelector } from 'reselect';

import { CartState } from './cart.reducer';

/*
we can't type the state yet because again, we don't have all of our reducers typed.
And unless we have them all typed, we actually can't type the reducer which will 
give us the value for this state type.

here inside of our select cart, we know that what we're going to get back from 
select cart reducer is the cart state.And now automatically what we notice is that 
everything else gives us what we want it to give.

So select cart count, of course, returns a number select is cart open returns a 
boolean select car total returns a number.All of these are now intuitive enough to 
know based on the inference of the actual top level cart state,
what all of the subsequent values are.

this is a very, very powerful thing that comes with our selectors as well as TypeScript 
due to the natural inference because we've typed what this initial entry reducer 
gives back, which is the cart state, all of the subsequent derivations are going 
to be automatically inferred if you reduce over cart items and we know that this is a 
number, then automatically cart item we're using the quantity,
which is a number you can only get back from this, reduce a number.
That's the power of this technology with TypeScript and these inference engines that 
come with the code
*/

const selectCartReducer = (state):CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
