import { CATEGORIES_ACTION_TYPES ,Category} from './category.types';

import { CategoryAction } from './category.action';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE:CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};
/*
Previously we have implemented this pattern (discriminating union type) in order
to type this action that this reducer gets.

Just to go over this discriminating union type is a union type of all of the 
different action types that can come in as the action argument that this reducer
will respond to.

The problem with doing this pattern and it's a very common pattern.
You will see this throughout many different TypeScript enabled redux applications.
The problem is that even though we as developers are saying, okay, this reducer only 
responds to these action types, redux doesn't only pass these action types to the reducer.

Redux, as we know, passes every single action type to the reducer.
Whenever an action dispatches, they go to every single reducer.
So even though for us in our code, we know that for this reducer we only want to
respond to these three different actions.

In reality, when all of this compiles down to JavaScript, in the end, 
Redux is still going to dispatch all the actions, and there's no type cards that's 
preventing any of the actions that don't match this
discriminating union from coming in.
*/


/*
So we have an interesting path down this here.
We know that there is value that we get from typing out this action 
for example, must be category, because by the time
that our code can pass this case statement of fetch category success,
the action must be fetch category success.
We get that benefit through using our typescript types.

But in order to retain that, we do lose some of the actual reality of our code.

For example, if I were to comment out this default return state, first of all, 
you'll notice that this is not throwing an error.

In fact, even if we explicitly tell this reducer to return category state.
Notice how this is not an issue. We don't get this type error that we're not 
returning when any action does not pass these types.

Now, you might be wondering while you are, why is that happening?

The reason for this is that TypeScript is inferring 
that this reducer will only receive these three action types.
And inside of your code, you have created a case for all three of these 
action types, and they're all returning a state object
So TypeScript thinks that you've actually covered every possible case
that this reducer can receive, but we know that's not true.

There are a bunch of actions that fire, whether it be the ones that
are not within category action or maybe it's the init action that dux
actually fires on initialization. Maybe it's these different actions 
such as redux persist, rehydrate that we've seen before from our
middleware.

All of these actions pass through these reducers.
And again, the way that redux determines that this does not need
to be re rendered is through this default return.
But now our code no longer is protected from it.
*/
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction
) => {
  
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

/*
So what we need to do is we actually need to modify our reducer utils with something
that allows us to be more diligent in the actual matching.
And this is known as type guards.

So the way that we can do this is inside of our reducer utils.
We need to create some way for us to actually match these actions directly on 
the type itself.So the type value needs to be something that we can leverage in
order to check in our reducer rather than passing this discriminating union.

So we know we can get any action.The thing, though, is that despite getting any action, 
we only want our code to respond to specific actions.

Well, this is where we're going to create something known as matchable.
A matchable type is a type that we ourselves implement.
And what this allows us to do is it allows us to extend all of these 
different action creator functions with an ability to match the received
action by the type that this action creator is associated to.

This action creator, we know returns back this specific type with this categories
action type batch category start as the type that this action creator represents.
So we'll receive an action.We want to leverage this function to do a check.
And the way we do that is we're actually going to attach a method on this action creator.
*/
