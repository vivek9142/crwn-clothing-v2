import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  //import User for User type firebase
  User,
  //import Next or Observer
  NextOrObserver
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

const firebaseConfig = {
  apiKey: 'AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk',
  authDomain: 'crwn-clothing-db-98d4d.firebaseapp.com',
  projectId: 'crwn-clothing-db-98d4d',
  storageBucket: 'crwn-clothing-db-98d4d.appspot.com',
  messagingSenderId: '626766232035',
  appId: '1:626766232035:web:506621582dab103a4d08d6',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

/*
If you remember, this was our method that allowed us to add a bunch of things into 
Firebase.We are batching them, we're committing them, and that's how we finished it.
Collection key is the string representing the collection.We want to add this to objects 
to add what is objects that objects to add is going to be an array of
some specific type of object that we are trying to add into our DB.

So here, because it could be some random type that we don't know in the future, 
we want to make itso that we can pass it in as a generic.The only thing we know that for 
sure exists on this object is a type title.So here I can even make a new type object 
to add.
We can export this out because in the future maybe we might need it.And again, the only 
thing it has is some title, which is a string, because using that title is oftentimes
how we're going to determine what it's going to be.So here we can just add that as the 
type T as an array.And then this field, I actually think it's not even being us
*/

export type ObjectToAdd = {
  title: string;
}
export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
  collectionKey : string,
  objectsToAdd : T[],
  //And then this field, I actually think it's not even being used.we can just 
  //get rid of fields.
  //field

) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};
/*
Actually, earlier here with the same async function, we want to return something.
addCollectionAndDocuments function doesn't return anything.
With async functions, you always return a promise.And within the promise you have a value.
So for us, we're not actually resolving or returning any values.So we can just make sure 
that this returns a promise of void, whereas forget categories and documents.
What does it return, though?
In this particular case, it returns some category data.
so we'll import category data from category.types

If we look at our return though here, we see that this is actually not working 
because what we get is a bunch of query snapshots.The reason for this is 
because we know what it is that Firebase gives us back.
But TypeScript doesn't know that we've looked inside of our Firebase.

DB we know what the object will be.So this is where we actually need to cast the value.
we can say is that doc snapshot dot data like this is going to be as category.And 
essentially what we're saying is that we know that documents snapshot that data is 
going to come back as a category type.
So just cast this value of what you get back from the data call as a category type.

*/
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category
  ) ;
};

/*
we need to do is type out our create createUserDocumentFromAuth.
Now the user auth is actually something that we call user off.
What it really is is this user object that we get from luckily firebase.So this is already 
something that's typed.Firebase auth gives it to us.

We know that with this we also get some additional information.Now, for now, all we're 
adding for this additional information.Is just.The display name and this is even optional.

And the reason why we only have a display name, of course, is because according to 
our signup form,that's the only values we add.
If we were to add more, we can, of course add to this additional information here.

Moving on, we also need to type out the actual user data.here I'm going to type out 
user data because user is already claimed by Firebase.
Well, user data is something that we get back from this final setDoc call where 
we return back this user snapshot.

So here, this is where we need to tell the actual function and utilize our user data.
So let's think about the flow of this document.
What can we get back?We can primarily get back user snapshot And inside user snapshot 
can either be the user data or it can be nothing.Because if we log out, 
remember we also run this through our listener or on the listener calls create user doc off.
Regardless of what happens if you sign in, if you sign up and if you sign out, 
all three values of user off get past it, which is why we have this check.

So here we might actually resolve to undefined.that means that this function can return 
back a promised value of both this void value or it can return back this user snapshot.
Now user snapshot is not the data.We're not returning back the data, 
we're returning back a snapshot.So this snapshot, though, is actually already typed for us.
And this is something that Firebase gives us.

So here, up inside a fire store, we can get a query document, snapshot type, and this 
snapshot type is going to hold the value inside of the snapshot.
*/

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData  = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (
  userAuth:User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

      /*
      One thing you'll notice here is inside of catch air will not have a message type.
      This is because inside of every catch by default it is going to be of an unknown type.
      So for us, instead of trying to just call directly air dot message, we can just console.log the whole
      error.Again with unknown unknown as very similar to any.The only difference is that 
      unknown is not reasonable.You can't set the value of an unknown to something else.
      But just like any TypeScript has no idea what it's going to be.
      There's no type associated to it.
      And the reason for this is because you can catch numerous types of errors.
      */
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};
/*
So here, if we hover over this, we already say that we're going to get that back promise 
of either user credential or undefined.
The reason it's undefined is because we might exit early, so we don't need to type this.
*/
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


/*
The callback is a function, but it's a very specific function.It is a next or observer type.
So this again is a very special function that gets called with the dot next as a callback 
whenever the observer changes.

Now, luckily for us, we actually can import this type as well from Firebase.
So here we just go up to Firebase Auth and we just import in next or observer.
And what this gives us is the user, because on off state change is always passing 
us this user that we already saw earlier.
Again, this is a user account.
So whenever the offset changes, our base is trying to give us that user account.
*/
export const onAuthStateChangedListener = (callback:NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

/*
This was that type that we had created to return us back. A promise.And that is going to be.
Either a user or no because again when we call this what we are looking for as 
onauthstatechanged we might get back the currently signed in user or authenticated user or 
if there's no user. Firebase gives us null.
So as a result, the promise can only resolve with user or null.
*/
export const getCurrentUser = ():Promise<User | null > => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
