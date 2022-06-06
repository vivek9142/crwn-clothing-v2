export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
};

/*
The thing about these fields, though, is that these are not just strings.
These, in fact, are specific constants.there are only three actions

These are the only three category related action types.
So this can actually be converted to a enumerable type, which is an enum.
And an enum is a special.It's not even a type.

It's actually an extended version or extended data structure that 
TypeScript introduces to us.And it's usable the same way that you can use an object.
The only thing about it is that it has fixed values.

In other words, instead, when you hover over categorize action type right 
now with our object.Notice how these keys point to strings.
Instead, if we were to convert this to an enum.

*/