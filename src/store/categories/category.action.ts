/*
we finished updating our width matcher function that takes some action creator function
and adds an additional functionality of them so that they can determine if a past action
has the same type as the corresponding action that they create.

let's import it in and then what we're going to do is use with matcher
and wrap around each and every one of these different action creators.
So these action creators we've made so far are going to be the argument that gets 
passed to with matcher. And now what happens is that each of these are Matchable 
action creators.They now have that extended dot match method.

So here this is an action of the type categories.
Fetch, action, start.
So we're reaching into this function, getting this action type, and then getting 
the actual type from the enum and setting that to some type value at the top level 
of the actual function itself.Similarly, if you check the match function, 
it is also a faction that receives some action of any action.
And it types that predicate to fetch category start if it passes the match.

So that's really all we're doing here.
Now we're going to use these actions inside of the reducer.
So now that's category start.Fetch categories.Success.Fetch.Categories.Failed.

So remember, the original problem we're aiming to solve is that we want to make 
it so that this reducer is way more accurate to what's going to actually happen.
*/
import { CATEGORIES_ACTION_TYPES , Category} from './category.types';

import { createAction , Action , ActionWithPayload , withMatcher} from '../../utils/reducer/reducer.utils';


export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;


export const fetchCategoriesStart = withMatcher(
  ():FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray:Category[]):FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    ));

export const fetchCategoriesFailed = withMatcher(
  (error:Error):FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
