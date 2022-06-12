export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
  SIGN_UP_START = 'user/SIGN_UP_START',
  SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILED = 'user/SIGN_UP_FAILED',
  SIGN_OUT_START = 'user/SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED',
};

/*
The thing that we've done before was that every time we were storing some kind of 
data structure inside of our state, particularly if we're current user, 
we would put the user type or the object type,

the data type inside of our user types file or the corresponding types file.
In this particular case, our user data actually lives inside of our Firebase Utils.
If you remember earlier, we had defined this user data property.
So here what we can do is we can either keep it related to Firebase or move it 
to user types.
Personally, I'd rather keep it in the user data inside of Firebase because this 
data actually matches the data inside of Firebase that we get back.
So to me, it's more correspondent that it's related to Firebase than 
it is related to some type thatwe have defined specifically for Redux.
*/