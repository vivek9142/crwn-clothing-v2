import { AnyAction } from "redux";
/*
The any action type is essentially an interface that extends upon this action type.
The action type is just a action interface that has this generic t, this t can be anything.
But the idea here is that this T is going to go to some type value.

Any action also extends upon extra props.So any additional properties that you want.
Some people use actions inside of their project or they actually add their own values.
So it's not just tied to type and payload.
Sometimes there are some additional ones, but the reason why they use this action
as the base is because not all actions have payloads.

So what we need to do is we need to take this any action and we have to figure out a way
so that we can extend it into our system, so that we can utilize all of our surrounding
libraries. And this is a very important thing to know.
*/

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

/*
I'm saying whenever we call this action with payload, this T value is going
to be one of those enum values that we're going to pass in.
Because as I mentioned, when we did our category types right here, we know that
the type is a very specific string.

So I want to be able to pass that enumerable member value and then set that as the type.
And then for the payload while we can pass in any payload that we want.

The next thing that I need is the type of action.
And action is also going to receive a generic T, and this T, of course, goes to the type.
But because we have no payload here, we are just going to remove the need for the payload.
*/


/*
Now, you might be wondering, well, why is it that with this action we've created two types?

So the reason why this would be incorrect is because if you hover over this payload, 
you see that this property of payload points either to P or undefined.
The problem with doing this is that it essentially says that you have a chance of
getting an action where payload is always present.

It's just going to point to undefined.
While that's true in JavaScript, we actually don't want that to be true in TypeScript.
We don't even want there to be a payload in the first place.
Essentially, if you get this action where it's just the type, no payload, if you try to 
call payload,

we want to throw actually that there is nothing there.It's an error.
You can't even access payload because payload isn't even a property on this action type.
By doing this, we narrow the scope because if we generate a action where it just has 
type no payload,
*/

/*
We have an action with a payload and we have an action without a payload.
Based on this, create action depending on if we receive a payload or not, 
we want to return the appropriate action.

We want to either return an action with payload type if there is a payload, 
but if there is no payload,then the type that we get back from calling 
create action should just be a regular action.

So in order for us to achieve this, we need to do something known as function overloading.

So function overloading actually comes from TypeScript, not JavaScript.
Function overload provides us this ability to make multiple function type definitions 
of the same name,so we can have multiple type definitions for create action.
And what it allows us to do is allow this function to receive different parameter types.
*/

/*
In order for us to do it, we actually need to use the classic function declaration
style rather than the arrow functions.

This create action, as we know, is going to get a type in a payload.
So depending on the action that we're creating, again, we're passing those constant values, if you
remember, from our action type. Right here.
These are these fixed values in our enum, so we need to pass that as the T value.
But we know this is a string, so we're going to say that this create action extends string.
*/
export function createAction<T extends string, P>(type: T, payload:P){
    return {type,payload}
}

/*
So now we need to do the overloading.
So to overload, if you're going to export, you always want to export 
all of your overload definitions. So again, we're going to take the same function,
function, create action, and here we're going to
receive some T that extends string and we're also going to receive P.

So now what we're doing is we're just typing the function the same way, 
except we're going to make sure we return action with payload.
Now we've already defined the implementation part in this last function.
We don't need to define the implementation again.
We're just going to define the type.So here we know that we extend these values, 
but we also need to now pass these types into the parameters.

So here we're saying, okay, this create action function, we'll get some type of type
string and then some payload. Of. And then what it'll do is that it just returns 
back action with payload.T and P.
*/

export function createAction<T extends string,P>(type:T,payload:P):ActionWithPayload<T,P>;

/*
Now, what we want to do is we want to type the function if it gets called with just a type
becausewhen it just gets called the type, we want to pass back an action, not with payload.
So here we're going to say T extends string.

But what we need to know is that, okay, when this create action gets called with just 
type T, there's no P value here.
So here we know that we are getting type tea, but the thing is that Create Action is 
technically expecting a payload value because it's not optional.

So this means that we want to make this essentially equal to void,
which means that you are not expecting anything. And then we can just say Action type tea.

Now, if you did not include this, let's say you just did this, you will see that 
action throws you a error because again, it says the overload signature is not compatible
because as I mentioned earlier,in order for you to overload functions,
you must have the same number of parameters.
So the way that you avoid this is you just say, okay, the payload then gets nothing.
Void, no value.

And with this now, you'll be able to create this additional create action typing
on our function.
*/

export function createAction<T extends string>(type:T,payload:void):Action<T>;

// export const createAction = (type, payload) => ({ type, payload });
