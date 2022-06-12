import { Middleware } from "redux";
import { RootState } from "../store";

/*
And as you can probably guess, since this is a middleware, we're going to need that 
middleware type that we had seen from before.Middleware, of course, coming from Redux.

we're going to do with this middleware is we need to pass it some arguments, 
one of which is going to be the root state value that we had created ourselves.
This middleware is going to be of the type middleware.

when you hover over middleware, what is it that it takes?Well, first, it takes some 
template dispatch extension.This is an extra dispatch signature added to this middleware.
And you add it essentially as a type.So if you want to add more onto your dispatch, 
you can do so.But ours barely does that.We are never going to really modify the dispatch 
with this middleware.

It means that if you want to add that functionality onto your dispatches, 
you're able to do so.Some libraries like to do that.We definitely don't need that.
So for us, we're just going to pass an empty object or an empty type saying 
that we're not extending it at all.The second argument is going to be the state.
This is the state of this middleware, and we are receiving the root state.
Third argument we don't need to pass anything for.
*/

export const loggerMiddleware:Middleware<{},RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};
