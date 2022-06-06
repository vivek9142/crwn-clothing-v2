import { CATEGORIES_ACTION_TYPES } from './category.types';

/*
we are going to import in.Category action.From our category action for.
*/
import { CategoryAction } from './category.action';

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};
/*
And what we need to do now is we need to figure out how to utilize this category action
and pass it as the action type here.
This is where you're actually going to use that AS a keyword.
So here are saying, hey, this action that you receive is only going to be one of these
three action types.

Now, this pattern is called a discriminating union.
Essentially, this union type that we've created for category action is 
discriminatory because it says that I only want to accept actions of these three types.
This reducer only responds to those actions.

If you try and call any other type inside of this definition, 
I'm going to throw you an error because I know this action should only be one of
these three types.

This is actually a very common pattern you'll see inside of TypeScript enabled Redux
projects, but this alone is slightly problematic and we will discuss that after 
we've typed out the rest of this reducer.
*/
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // action = {}
  action = {} as CategoryAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
