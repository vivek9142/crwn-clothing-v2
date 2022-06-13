/*
First, we want to migrate from Redux saga effects over to typed Redux Saga.
And now earlier we had just use type redux saga, but we can actually also use slash macro.
it will allow us to essentially leverage that Babel macro plugin.
What is the battle macro plugin?So generally speaking, when it comes to using third party 
libraries or builders of third party libraries,what they have to do in order for them to add 
additional steps during the code transformation or the compilation step is they have to 
create something like a babel plugin that you need to install.

This plugin is going to be unique to their library in order for the code to compile 
the way that they want it to to interact with the babel step.However, Babel has defined a 
very clear step on how to actually create this type of tool inside of BABEL.
So it's kind of like you can see it as a standard interface for libraries to use.

it just simplifies the final output of the actual actions that get created by the effects.
We won't really see those effects, but generally speaking, it's really helpful for us 
later on
*/
import { takeLatest, put, all, call } from 'typed-redux-saga/macro';

import { USER_ACTION_TYPES } from './user.types';
//import User
import { User } from 'firebase/auth';
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  //import EmailSignInStart
  EmailSignInStart,
  //import SignUpStart
  SignUpStart,
  //import SignUpSuccess
  SignUpSuccess
} from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  //import AdditionalInfo
  AdditionalInformation
} from '../../utils/firebase/firebase.utils';

/*
So first we notice that we have two type of course, both of these parameters 
that we're passing inside.So the first thing we need to do is we need to import user 
from Firebase Auth, which is the type because that's what our user auth is going to be.
*/
export function* getSnapshotFromUserAuth(userAuth:User, additionalDetails?:AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    /*
    we notice is that I.D. and data, these are properties that may not exist
    because the query documents snapshot.At this point, we don't know if there is a 
    guarantee that we will get this snapshot because create user document from off.

    we can say if user snapshot, then we will actually try and yield out this value.

    And there you see that this value is now clear, but this value now throws an error 
    because it says that we do not have an ID on the type of user data.
    So sign in success is expecting a user data object.Right here.
    But the problem is that inside, when we actually append it again, we do append the ID 
    from somewhere else.So what we can do here is we can actually extend this type to 
    have the idea of string in SignInSuccess Action in User.action.Because if you remember 
    inside of our saga, what we were doing is that we were getting the ID from user 
    snapshot ID.
    */
    if(userSnapshot)
    yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

/*
we see that we actually have an issue where missing a property,the property that we're 
missing is actually the additional details being passed here as the second argument
inside of get snapshot from user.
But the third argument of call, the reason for this is because we did not make this 
optional.So in order for us to fix this, we just have to define this as an optional 
parameter.and now the call will fix as again, with this error, we just need to set 
this as error.
So in order for us to fix this, we just have to define this as an optional parameter.
in getSnapshotFromUserAuth
*/
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
/*
we can look at sign in with email.What we have is that we know that Simon with email is 
getting called with a specific action.The place where we call it is that whenever 
we take latest user action types, dot, email, sign and start take land well past the 
action that matches into our actual saga.So that means that this is actually a 
action that we are structuring.The specific action that we are structuring here is 
in fact email sign in start.So we just need to import that from our types.
This, I believe, is inside of our user action folder.

So we can just copy this and we can just say that this is what we are trying to do, 
structure all of our values off of, and you'll notice we'll get email and 
password as strings because those are the parameters on our payload.
*/
export function* signInWithEmail({ payload: { email, password }}:EmailSignInStart) {
  try {
    /*
    Similarly inside of this sign in call here we again are getting back a snapshot 
    from sign in with off user and email and password.
    As we can see, we get back a promise of the user credential.
    We might also get back undefined.The reason we get back undefined is 
    because we might return early.So this is why we might get undefined.
    So what we need to do is we need to do a similar check as to what we had above here.
    So what we'll say is that instead we're not getting back a user snapshot from here.
    We're actually getting back a user credential.But this credential, of course, might 
    be undefined.So we'll first do a check.Is there a user credential?
    If there is, then we will structure off the user from this user credential upon 
    which we will yield out a call in order to get the snapshot from user auth 
    passing it onwards to our next saga.As well.
    */
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    
      if(userCredential){
        const {user} = userCredential;
        yield* call(getSnapshotFromUserAuth, user);
      }

  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
/*
Here inside of sign up. Where do we actually call our sign up saga?So if we scroll down, 
we notice that we call our sign up Saga on sign up start.So this happens when we get 
that action, sign up, start. So here, let's scroll up and let's bring in the 
corresponding action type.

So here we see that user is authenticated by this credential, but user is not assignable 
to the parameter type of user data.Now the reason we're throwing this error is 
because our sign up success has defined user to be user data.

So this most likely means that we actually mistyped our sign up success definition.
Here we are defining user as user data, but this is most likely incorrect.
We're actually expecting this to be of the type user that we get from a user credential.

So the reason why is because when you sign up, you are authenticating.When you authenticate, 
it does not mean that you have an instance of the user inside of our firestorm.
User data is the data that comes from the user snapshot, which is an instance 
inside of firestorm data.The user that comes from a user credential is just that 
auth information.Again, I know it's very confusing because a firebase and its 
naming conventions, but here we know that what we need to bring this from is firebase/auth.
So with the user now what we can do is properly fix our typing issue.

So inside of sign of success, we need to update it here and we also need to update the 
action itself because the action definition most likely has it as also user data.
*/
export function* signUp({ payload: { email, password, displayName } }:SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if(userCredential)
    {
      const {user} = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }:SignUpSuccess) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
/*
Similarly, we also need to type our sign out failed as error and then our sign in 
after sign up.This saga gets called specifically after sign up success.
So we need to get the action for sign up success.
*/
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
