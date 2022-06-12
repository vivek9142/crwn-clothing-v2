import { compose, createStore, applyMiddleware , Middleware} from 'redux';
import { persistStore, persistReducer , PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

/*
we want to type out the root state itself, which is the actual values that are contained 
inside of the actual root reducer.

Now, if I just put root reducer here, if I were to get the return type of root reducer here, 
you'll notice that this is going to give us an issue.It says that root is a reduces to a 
value but is being used as a type here.Did you mean type of root reducer?

So root reducer is a function or something that lives in JavaScript.It doesn't live in 
TypeScript world.It doesn't live in the type world of TypeScript.At the very least.
We can get the type of it though by using type of like this type of gives you the 
type of whatever you are calling it on.
So for us now, when we call type of root reducer, we are getting back that reducer 
combined state and then of all of our states.
So when we get the return type of it, root state will now give us that object that contains 
all of those values.
Now it's an empty object as well, because on initialization nothing is going to be contained 
and then it populates once all of our reducers return back with corresponding values.
Then the roots, they actually gets built.But the key thing you'll notice is that it is 
indeed an intersection, but primarily of all of our different states to their corresponding 
slice keys.
Now that we have our root state, we can now start fixing all of the different type issues 
that we had earlier inside of each of our selector files.
*/

export type RootState = ReturnType<typeof rootReducer>

/*
one other thing we want to tighten up is this persist config.
If you hover over it, you notice that it is of this type object key of string storage of 
web storage white list is a string array.Now we only want a white list values inside of 
our root state.So what we can do is we can extend upon the existing persist config.
Now from redux persist there is a process config object.
This is a type that contains all of the existing values that actually 
exist inside of a persist config.So whatever values you can actually pass to it.
So we just want to extend upon this.

What the white list can contain.
So we want the white list to only contain an array of the keys of the root state.So key of 
will get you back only those values inside of root state.
The key values which are of course the only values that we want to pass here and now, 
we can say that persist config is of type extended persist config.While the white list 
value can only contain user categories and cart.
*/

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
}

const persistConfig:ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter((middleware):middleware is Middleware => Boolean(middleware));


/*
e notice that this says that property redux devtools extension and post does not exist
on type window and type of global this.So the window is typed as well.
The window object which the browser gives to us.We want to extend on it.
And the way you do that in TypeScript is you first need to declare a global.

So you're saying, hey, I want it to close globally.
And what we're going to say is that interface window, which is something that already 
exists, we are going to add this redux devtools.Now this is going to be an optional 
key so we can put question mark.COLON And that just means that it does not have to be there.
It might be there.It might not be there.
The reason it might be there is because sometimes we load it with the DevTools.
It might not be there if the user doesn't have the extension.
*/

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?:typeof compose;
  }
}

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


/*
we notice that we have a type error with our middleware.We see that argument of type false 
or middleware is not assignable to the parameter of type middleware.Type Boolean is not 
assignable to type middleware.And the reason for this is because apply middleware 
is only expecting middleware as inside.

If you look at this middleware array, the reason this is happening is because here our 
process and check to see if it's in production mode or not because of the double 
ampersand, we could end up with a false value, meaning that if this evaluates to false, 
we won't even bother evaluating the rest of the statement.
Now, even though this value will be false, we will filter it out with our boolean check.
The problem is that TypeScript does not know that by filtering out whatever is true or false, 
this middleware will narrow its type down to middleware.

All it knows is that there's a chance that whatever this filters through, it may just still 
be someBoolean value.And this is where we essentially need to tell TypeScript exactly what 
this filter is doing.
Listen, if you pass the truthiness of this check inside of the filter, then you are for sure 
left with a middleware because anything that's false is going to get stripped out.

This is the perfect time to use what we already know, which is our type predicate functions.
So we need to first import in that middleware type so that we can then utilize it in order 
to actually narrow the type once it passes through our check.
So for this Boolean, I'm going to actually write the callback so we know we're getting some 
middleware and now we're going to narrow the type using what we know we're going to say 
if middleware passes,then its middleware is going to be of the type middleware and 
then we'll pass the actual middleware parameter into this Boolean check.
*/
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
