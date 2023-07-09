import React, { useContext, useEffect, useState } from "react";
import { getWords } from "../firebaseInnit/firebase";
import { UserContext } from "../userContext/userContext";
const WordsContext = React.createContext();

function WordsContextProvider(props) {
    const [words, updateWords] = useState([]);
    const [topic, setTopic] = useState("");
    const { user } = useContext(UserContext)

    async function updateTopic(topic) {
        setTopic(topic);
        const words = await getWords(topic, user?.uid);
        updateWords(words);
    }

    useEffect(() => {
        if (topic !== "" || user == null)
            return;
        const setDefaultValue = async () => {
            await updateTopic('colors');
        }
        setDefaultValue()
            .catch(console.error)
    }, user)

    return (
        <WordsContext.Provider value={{ words, topic, updateTopic, updateWords }}>
            {props.children}
        </WordsContext.Provider>

    );
}

export { WordsContextProvider, WordsContext };