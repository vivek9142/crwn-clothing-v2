/*
The moment we start actually converting our selectors over until you convert all of them,
TypeScript is actually not going to compile for all of this code and the reason why
is because we do not have a root state type for our top level selector yet.
So what you'll notice is whenever you check your application, unfortunately it will always
throw an error until we get to the section where we type out the root state.

So in this conversion we can't check that everything is continuing to work unless
we type the selectors last.

I'm going to mention that until we build out all of these reducers, we can't technically
type out this root state.So that's what we're going to do next.
*/

import { createSelector } from 'reselect';

/*
We know that we're turning back the category slice which
we just defined as the categories state.
*/
import { CategoriesState } from './category.reducer';

// we need to do is just import this in(Category-Map type)
import { CategoryMap } from './category.types';

const selectCategoryReducer = (state):CategoriesState => state.categories;

/*
if you actually look inside of this selector,it's actually smart enough to know what 
the types are now, because again, this category state is what gets returned by 
this selector.
So then this value that it receives, this parameter must be the category state.
So if we pluck off the category's value, then select categories returns a memoized selector.
So that's what all of that stuff near the end is showing you.

But notice how what it returns back is the category array, which is what this 
category's value points to.
*/

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);


/*
Now for this next selector, we see that we are indeed typing already and the TypeScript
compiler knows that we're getting the category array.
However, it doesn't know what to do with this category is reduced because it doesn't
actually know what this accumulator value is since it's of any type.
Right now, it's just an empty object.
So what we need to do is we need to type explicitly what we expect the category map to be.
So inside of our CATEGORY.TYPE.TS, I am going to now create a category map type.
next - All we need to do is just import this in(Category-Map type).
*/



export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)

    /*what we can say is that from this selector, we're going to return a category map.
    And this object right here we can type as category map like so.
    So right now, essentially, you generally don't want to cast anything because essentially
    you're overwriting the type.

    You're telling TypeScript that this type is going to be something.
    But here with Reduce, we know that what we're building out is going to be this
    category map object.
    So this is a place where it's relatively type safe to do this.*/
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
