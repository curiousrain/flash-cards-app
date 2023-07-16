import { makeAutoObservable } from 'mobx';
import { setWordInFirebase, deleteWordInFirebase } from '../firebaseInnit/firebase';
import { getWords } from "../firebaseInnit/firebase";
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";

export default class RootStore {
    constructor() {
        this.userStore = new userStore(this);
        this.WordsStore = new WordsStore(this)
    }
}

class WordsStore {
    words = []
    topic = ""
    user = null
    fields = [
        "hebrew",
        "english",
        "transcription"
    ]

    constructor(user, rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore;
        this.user = user;
        this.topic = topic;
        this.hebrew = hebrew;
        this.english = english;
        this.transcription = transription;
    }

    updateTopic = async (topic) => {
        this.topic = topic;
        const words = await getWords(topic, user?.uid);
        this.word = words;
    }
    editWord = (index) => {
        const word = words[index];
        word.isEdit = !word.isEdit;
        if (word.isEdit) {
            editedWords[index] = { ...word };
        } else {
            delete editedWords[index];
        }
        updateEditedWords({ ...editedWords });
        updateWords([...words]);
    };
    updateWord = (index, fieldName, e) => {
        const word = editedWords[index];
        const wordValue = e.target.value.trim();
        word[fieldName] = wordValue;
        updateEditedWords({ ...editedWords });
    }
    addWord = () => {
        const word = {
            "hebrew": "",
            "english": "",
            "transcription": "",
            isEdit: true
        };
        updateWords([word, ...words]);
        const newEditedWords = {};
        for (const [key, value] of Object.entries(editedWords)) {
            newEditedWords[key + 1] = value;
        }
        newEditedWords[0] = word;
        updateEditedWords(newEditedWords);
    }
    deleteWord = (index) => {
        deleteWordInFirebase(words[index], topic)
            .then(() => {
                words.splice(index, 1)
                updateWords([...words]);
            })
    };
    saveWord = (index) => {
        const updateWord = editedWords[index];
        const fieldValidation = /[A-za-z\u0590-\u05fe]+/;
        updateWord.errors = [];
        let hasErrors = false;
        fields.forEach((field) => {
            if (updateWord[field] === '' || !fieldValidation.test(field)) {
                updateWord.errors.push(field);
                hasErrors = true;
            }
        });
        if (hasErrors) {
            editedWords[index] = updateWord;
            updateEditedWords({ ...editedWords });
            return
        }
        const wordToSave = {
            "hebrew": updateWord.hebrew,
            "english": updateWord.english,
            "transcription": updateWord.transcription,
            "author": user?.uid
        }
        words[index] = wordToSave;
        setWordInFirebase(wordToSave, topic)
            .then(() => {
                editWord(index)
            })
    }
}

class userStore {
    auth = getAuth();
    user = null;
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    login = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        signInWithRedirect(auth, provider);
    }

    logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.error(error)
        });
    }

}
