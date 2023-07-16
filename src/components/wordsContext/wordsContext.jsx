import { Provider } from 'mobx-react';
import React, { useContext, useEffect, useState } from "react";
import { getWords } from "../firebaseInnit/firebase";
import { UserContext } from "../userContext/userContext";
const WordsContext = React.createContext();


function WordsContextProvider(props) {

    const RootStore = props;

    useEffect(() => {
        if (RootStore.topic !== "" || RootStore.user == null)
            return;
        const setDefaultValue = async () => {
            await RootStore.updateTopic('colors');
        }
        setDefaultValue()
            .catch(console.error)
    }, RootStore.user)

    return (
        <Provider {...RootStore}>
            {props.children}
        </Provider>
    );
}

export { WordsContextProvider, WordsContext };