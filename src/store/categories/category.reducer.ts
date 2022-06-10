/*
So remember, the original problem we're aiming to solve is that we want to make it so that 
this reducer is way more accurate to what's going to actually happen.
Essentially, each of these actions that come in can be any action at all.
So let's import in any action from Redux.

So instead of selling this to this discriminating union of category action, 
we know it can be any action.So now what we're going to do instead of using 
this switch statement is we're going to say, okay,
if the action that you give me matches fetch category start.So I'm say if that's 
category start match the action.
If it matches, if you hover over this action now, what do you see?
You see that the action has been narrowed.It must be of fetch category start.
That's what we're doing here.
If it matches, it must be of this type.
So now what we're going to do is return back to this category state except 
is loading is true.

Now what you'll see, though, is that we still have an error inside of category state.
The reason why when you hover over it, it says function lacks ending return statement
and return type does not include undefined.

So here we've explicitly stated that this function always 
returns you back some category state, but clearly that is not what's happening.So in order 
for this to work, we must explicitly return.If none of these actions match any of our 
corresponding action creators, then what we do is we return
the default state.And now our categories reducer is fully type safe.
*/
import {Category} from './category.types';

import {fetchCategoriesStart , fetchCategoriesSuccess , fetchCategoriesFailed} from './category.action';
import { AnyAction } from 'redux';

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
  // action = {} as CategoryAction
  action = {} as AnyAction
):CategoriesState => {
  
  if(fetchCategoriesStart.match(action)){
    return { ...state, isLoading: true };
  }
  
  if(fetchCategoriesSuccess.match(action)){
    return { ...state, categories: action.payload, isLoading: false };
  }

  if(fetchCategoriesFailed.match(action)){
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;

  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return { ...state, isLoading: true };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return { ...state, categories: action.payload, isLoading: false };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return { ...state, error: action.payload, isLoading: false };
  //   default:
  //     return state;
  // }
};
