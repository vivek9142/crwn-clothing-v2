export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
};

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export type Category ={
  title: string;
  imageUrl: string;
  items: CategoryItem[];
}

/*
Essentially, it's going to be a bunch of different key value pairs.And the pair value is 
going to be category items, arrays, because we're essentially converting this
category object, which is an array of these categories over to a map.

Now, in order for us to say that this key is just going to be any string, 
you're going to use these square brackets and you're going to say the key is just
some string value.It can be any value.
It doesn't matter.So this allows us to just say, Hey, all I know is that 
this key is a string, but the value is definitelygoing to be a category item array.
*/
export type CategoryMap = {
  [key:string] : CategoryItem[];
}