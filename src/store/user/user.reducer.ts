import { USER_ACTION_TYPES } from './user.types';
import { AnyAction } from 'redux';

import {signInFailed , signUpFailed , signOutFailed , signInSuccess , signUpSuccess, signOutSuccess} from './user.action'
import { UserData } from '../../utils/firebase/firebase.utils';

//type initial state
/*
So our user state, which is going to be current user, which is some user data and user data 
of course comes from our Firebase Utils.But it's going to be user data or it's going to 
be null because both are valid states that we can receive.

As well as our initialization state as well as loading is going to be a boolean, 
an error is going to be of type error or no.Now as mentioned, these are read only.
So let's make sure to make these also read only.
*/

export type UserState = {
  readonly currentUser: UserData | null ; 
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const INITIAL_STATE:UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return { ...state, currentUser: payload };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return { ...state, currentUser: null };
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return { ...state, error: payload };
//     default:
//       return state;
//   }
// };


export const userReducer = (state = INITIAL_STATE, action:AnyAction) => {
  // const { type, payload } = action;

  if(signInSuccess.match(action)){
    return { ...state, currentUser: payload };
  }

  if(signOutSuccess.match(action)){
    return { ...state, currentUser: null };
  }

  if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)){
    return { ...state , error : action.payload}
  }

  return state;
  }