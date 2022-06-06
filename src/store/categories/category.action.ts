/*
The first thing we are going to do is we know that we need a categories array.
Categories array, as we know, is inside of our database and it has a specific shape.
So we need to type this.
So here inside when you think about your category item.

we'll enter this type in CATEGORY.TYPES.TS

So first or import category and category item and we'll use them in order 
to type out these action creators.
*/

import { CATEGORIES_ACTION_TYPES , Category} from './category.types';

import { createAction , Action , ActionWithPayload } from '../../utils/reducer/reducer.utils';

/*
We have the action and we have action with payload because this one produces an action,
but this one produces an action with payload.
Now, again, remember, these actions are unique in the sense that their types are tied to
whatever this type is, and then the payload is tied to whatever the payload of this 
return is going to be.

So here, in order for us to type these actions, we'll say export type and let's type 
fetch category start first.
*/

/*
So now this action type, we need to say from this function, that's what you're returning.
So whenever this function gets called this action creator, notice that what you're 
guaranteed to get back is the action of fetch category start.
*/

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error>

/*
So now that we have these three action types, these are going to be the 
three action types that our reducer can only accept.
So in order for us to do that, we want to actually create a union.

So if we save this now, this category action is what we are going to bring into our
category reducer.
*/

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

export const fetchCategoriesStart = ():FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray:Category[]):FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error:Error):FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
