import { AnyAction } from "redux";
// import { fetchCategoriesStart } from "../../store/categories/category.action";


/*
we need to learn is we need to learn intersection types and 
we need to learn about the return type.

An intersection is essentially the joining of two different types.
So let's say we had some third type hybrid, for example, and this is 
equal to human & alien.
The & is going to be the intersection keyword.
It's the type literal here.

Hybrid, as you check, is now both a human and an alien.
What this allows us to do is set some variable, let's say, Josh.
And it can be of that type hybrid.
And now what you'll notice is that the value of Josh can have both
the name as well as the fly method.

This is possible because this hybrid type will have all of the properties
and their respective types of both human and alien.
If Josh was just a human, then you cannot have the fly method because fly 
cannot exist and assign on type human.

That is essentially an intersection type.
*/

// type Human = {
//     name: string;
// }

// type Alien = {
//     fly: () => void;
// }

// type Hybrid = Human & Alien;

// const Josh: Hybrid = {
//     name:'josh',
//     fly: ()=>{}
// }


/*
Other Part is return type
My func is just a function that returns you back a string.
If I wanted the return type of my func, I actually currently don't know how to get it.
The way I get it is I use a return type literal, so it's a very special key word inside 
of TypeScript that lets me get the return type from a function and then set it to something.

If we go back and we assumed that type human that we had earlier.
If this is what my func returns, then the return type again will get it and give
me that type. So this is what return type does for us.
*/
// type Human = {
//     name: string;
// }

// type myFunc = () => number

// type myFuncc = () => Human

// type MyReturn  = ReturnType<myFunc>;

// type MReturn  = ReturnType<myFuncc>;


/*
And we're going to now use both the intersection as well as this return type to create 
our matchable type.

Now the matchable type is essentially an extension on this action creator.
Remember how I said every function in JavaScript is a object we're going to attach
on every action creator this match property.

And what it does is it's going to reach into this function, get this return type action, 
and it's going to get on this action, the type value.
Now the type value is going to be equal to this specific value, and 
it's going to use that and compare it against any action we compare it against.

So to do this, what we need to create is first this type.
So I'm going to call this type matchable.
*/

/*
So again, we have some type matchable.
It's going to take a generic AC here stands for Action Creator.
We know that this action creator is going to be some function that returns back
any action. So as you can see here, we imported any action from Redux.
It has some type that can be equivalent to a string or anything else and 
it has a bunch of other properties.Could be payload, could be additional 
meta tags.We know a saw value add some additional stuff to these action
objects.

The key thing here is that any action literally says that it can have any number 
of fields, as you can see, any extra props there, string values that point 
to anything.That's the any action and extends some action which receive some 
type which of anything.
Of course for us we use strings or we can use enum values doesn't really matter.
But here this is the definition.

We are saying that we are getting some matchable receives a generic action creator 
which is an object that returns back any type.And what we want this matchable
to be is of course the action creators type and we also want to intersect
it against another type.
And this type is going to have that type value where we're going to get the 
return type from the action creator.
So we want to get the action itself.And off of this value, we want to get 
the type from the type property which we can access using these
square brackets.

This will reach into the action, get the type value, and then take the 
type off of that value and set it to this type.

Next we have some match method and this match method receives an action 
because as I mentioned, we're going to be comparing our type now 
against this action.And what the match does we haven't implemented yet.

But essentially what it will do is it will narrow the type down.
So this is where I mentioned before that we were using those type 
predicate functions where we narrow the scope of the type down.
So as long as whatever match receives that action, once it passes that check, 
we want to say that this action is definitely of the return type of our 
action creator.

So if our action creator is our fetch category start and it passes calling
match on the action, if it passes, then we know for sure it's going 
to be of the fetch category start action.

That's what this Matchable is trying to define.
*/

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action:AnyAction):action is ReturnType<AC>;
}

/*
now write out the actual modification function that will give us back a manual from an
action creator.

We might receive an action creator that has no parameters and it returns back and 
action any action.And for us, we know that this any actions type value is always 
going to be a string.
As far as we're concerned, we're using strings.
So we're just going to say, hey, what you're going to give me is going to have 
type string.
Then what we're going to say is that we.

Are going to receive the action creator function as the literal parameter for this 
with matcher function.So essentially if we had this fetch category start, we would
be saying with matcher receives fetch category start and we want to return back this 
modified version of fetch category star function.

But it has the match method and it has the type on it.So that's really what we're 
saying.So of course, that means that with matter must receive action creator and 
this action creator is going to be of that ac generic that we pass into it.

And what we're going to get back is a mashable object of that type a C.
So here, of course, that AC that we passed is also the AC that we're giving to 
the Matchable type.And Matchable, of course, will reach in, get the type off of 
the return type of AC.
And then similarly, we will create a new match function for it with this with match.
But for now we're just overloading this function.

if we had this fetch category start, we would be saying with matcher receives fetch
category start and we want to return back this modified version of fetch category 
start function.But it has the match method and it has the type on it.

So that's really what we're saying.So of course, that means that with matter must 
receive action creator and this action creator is going to be of that ac generic 
that we pass into it.
And what we're going to get back is a Matchable object of that type a C.
So here, of course, that AC that we passed is also the AC that we're giving to the 
Matchable type.
*/

// withMatcher(fetchCategoriesStart)

export function withMatcher<AC extends () => AnyAction & { type : string}>(actionCreator: AC): Matchable<AC>;

/*
But for now we're just overloading this function.
We're defining all the different types of action 
creators we may receive.
We know we can receive one with no parameters, 
and we also know we can receive one with parameters.
*/

/*
So here we need to account for these action creators that could 
receive any number of arguments.And the way that you type that is 
you accumulate all the arguments like so and you say that they are
anything when you accumulate them with the triple ellipses, 
I'm going to concatenate them all into an array.
So they can be anything.It could be anything because it's true.

This function still gives us back any action.
And at the same time, we also know that the type is going to be 
a strength.
We're just essentially saying I might receive a Action created 
that gets no parameters.I might receive an action creator that 
has parameters.
what we're going to do is that we are going to receive some 
action creator of type AC and we return back Mashable.
Of that same AC type.
*/

export function withMatcher<AC extends (...args:any[]) => AnyAction & {type: string}>(actionCreator:AC): Matchable<AC>;

/*
we need to do is write the actual function itself of with matcher.
with matcher receive some action creator which is a function and 
we're using a generic function here because we know that our action
creator can be any type of function, any kind of arguments return, 
any kind of action.
So we're going to use a generic function because we've already got 
some of our safeguards up here extending what this function will be.

Remember, this typing is just the implementation of the function 
in JavaScript.These others are type overloading for the function 
that we've already done.

So here I'm going to say, okay, what this with matcher function does 
is it receives this action creator and it gets the type value off 
of action creator Being invoked.So we get the action and then we 
get the type value.

The reason why we know there must be a type value is because these 
action create our functions, return back actions.

They always return back some action, and every action must have 
a type value.So we're invoking the creator, we're getting the 
action object, and then we're getting the type value
on it, and we're setting it to this variable.
And then what we're going to do now is we are going to create 
the actual map of the object.

So we're going to say object, assign on the action creator.
and we are going to give it the type value as well as the 
match function.
So the match function receives an action that can be of any 
action and it does the check it checks that action type of 
this past in action is equal or not to the type itself.

Now, remember this match definition we've already defined 
up here or received some action.And what it does is it 
type narrows down this argument.

If this passes, meaning that this is true, then this action 
received narrows itself from any action
to the return type of our action creator, which of course 
is our action create our function type value
that we just got here.

So it's a lot of steps, but what we're doing is we're 
essentially now creating this generic function
that is overloaded and allows us to receive any kind of 
action creator, but essentially be able to
check the type against it, which is very powerful.
*/

export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator,{
        type,
        match(action:AnyAction){
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string,P>(type:T,payload:P):ActionWithPayload<T,P>;

export function createAction<T extends string>(type:T,payload:void):Action<T>;

export function createAction<T extends string, P>(type: T, payload:P){
    return {type,payload}
}