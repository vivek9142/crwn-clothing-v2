
import { CATEGORIES_ACTION_TYPES , Category} from './category.types';

import { createAction , Action , ActionWithPayload } from '../../utils/reducer/reducer.utils';


export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

/*
we can extend our action creators so that they will be able to perform 
type checking for us where they receive an additional action through a dot match method that
we're going to attach on to them.And what this will do is it will check the action that 
it receives against the action that it's meant to create.

And essentially, these action creators are now performing double duty.
They generate actions out of them, specific actions, but they also type check actions 
against the action that they hold.In order to do this, we need to leverage something 
known as a type predicate.And a type predicate is kind of like a function 
that verifies whether a specific argument that it receives is going to be a 
narrower type or not. And I mean narrow as in more specific.

Ex - let's say we have type human and alien and some function that checks 
whether or not this is a human, what should happen is that based

What should happen is that after this verifies that the entity is human, 
then the type that comes out of it should be something that is narrow to 
the scope of human.So that means that inside what our logic needs to do 
is that our logic needs to assume that this entity.Is a human.

the speak method here should not be equal to undefined.If this is true, 
then what we'll get back is that the entity should be, in theory, more narrowed
once we've run it.
So what happens here is that we need to add this additional type definition
that the entity is human like. So.

So that's what this function aims to prove.
This function receives some argument value, which can only be either human or alien.
The logic itself essentially cast the entity as human.
The reason why we do this is if you try and call entity, speak like this, you'll get 
a type error.You'll get a type error because Alien does not have the speak ability 
because this is a union type.So you can't call again a method that doesn't exist on it.

So we have to say, assume entity is going to be human and check the dot speak method.
Because if you call that speak in JavaScript on something that doesn't have it, 
this is just going to be undefined.But if you call it on something that has it, 
then it won't be undefined.

So if it's human, then the output of this function is this type predicate.
It's narrowed that the entity that I received must be human.
That's what this logic is aiming to do.

let's say you create const Josh and put cond if Josh is human
this must be human because it passed this if condition statement and this 
type critical function narrowed this down so that it must be human.
This little check right here, this is keyword that we wrote.
This is narrowing this type so that anything that passes this function 
means that whatever you gave to it, if it's used later on, that type has 
been narrowed significantly smaller. 

So that is the whole idea around type predicate functions.
*/

// type Alien = {
//   fly : () => {}
// }

// type Human = {
//   speak : () => {}
// }

// function isHuman(entity: Human | Alien) : entity is Human{
//   return (entity as Human).speak !== undefined;
// }

// const Josh

// if(isHuman(Josh)){
//   Josh.speak();
// }

export const fetchCategoriesStart = ():FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray:Category[]):FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error:Error):FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
