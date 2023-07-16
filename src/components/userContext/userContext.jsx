import { Provider } from 'mobx-react';
import React, { useEffect, useState } from "react";
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
const UserContext = React.createContext();


function UserContextProvider(props) {
    const auth = getAuth();
    const user = auth.currentUser;
    const RootStore = props;
    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                RootStore.setUser(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                RootStore.setUser(user);
                // ...
            } else {
                RootStore.setUser(auth.currentUser);
            }
        });
    });

    return (
        <Provider {...RootStore}>
            {props.children}
        </Provider>
    )
}
export { UserContextProvider, UserContext };