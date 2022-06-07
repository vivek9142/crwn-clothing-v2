import { CATEGORIES_ACTION_TYPES ,Category} from './category.types';

import { CategoryAction } from './category.action';

/*Now, what we need to do is also we need to type this initial state.
To this object where we know this is read only because we cannot ever modify these values.
So read only is a additional property you can add so that you force it, that this state 
object can never be modified.
*/
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

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // action = {}
  action = {} as CategoryAction
) => {
  /*
  Property 'payload' does not exist on type 'CategoryAction'.

  even though we are passing in a payload right here that points to avoid this
  action, does not have a payload value.
  So as a result, you cannot de structure something that does not exist.
  So even though on some of our action types inside of category action, they are actions
  with payloads.But the moment you have one that does not have that property, 
  this will not work.And this is fine.
  We can just get rid of this call right here where we de-structure.
  */
  // const { type, payload } = action;

  /*
  typescript is smart enough to know that if your case hits this fetch category start,
  then what you're going to get here in the action is a regular action.
  Similarly, if you're inside and you pass this fetch category success, 
  then this action type must be of fetch category success, and therefore 
  the payload must be the correct payload.

  So that's one of those benefits that we get by creating this union type.
  */
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
