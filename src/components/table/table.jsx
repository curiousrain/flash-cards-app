import { useState } from "react";
import "../table/table.scss"
import TopicSelector from "../topicSelector/topicSelector";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useContext } from "react";
import { WordsContext } from "../wordsContext/wordsContext";
import { setWordInFirebase, deleteWordInFirebase } from '../firebaseInnit/firebase';
import { UserContext } from "../userContext/userContext";


function Table(props) {
    const [editedWords, updateEditedWords] = useState({});
    const { words, topic, updateWords } = useContext(WordsContext);
    const { user } = useContext(UserContext);
    const fields = [
        "hebrew",
        "english",
        "transcription"
    ]
    const editWord = (index) => {
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
    const updateWord = (index, fieldName, e) => {
        const word = editedWords[index];
        const wordValue = e.target.value.trim();
        word[fieldName] = wordValue;
        updateEditedWords({ ...editedWords });
    }
    const addWord = () => {
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
    const deleteWord = (index) => {
        deleteWordInFirebase(words[index], topic)
            .then(() => {
                words.splice(index, 1)
                updateWords([...words]);
            })
    };
    const saveWord = (index) => {
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
    return (
        <>
            <TopicSelector></TopicSelector>
            <table className="table-container">
                <thead className="columns-container">
                    <tr className="columns">
                        <th className="column-name">hebrew</th>
                        <th className="column-name">english</th>
                        <th className="column-name">transcription</th>
                        <th> <button className="add-word-button row-button" onClick={addWord}>add new word</button></th>
                    </tr>
                </thead>
                <tbody className="rows-container">
                    {words.map((word, index) => word.isEdit
                        ? <tr key={index}>
                            {fields.map((field) =>
                                <td className="row-content" key={field}><input type="text" className={editedWords[index].errors?.includes(field) ? "has-error" : ""} value={editedWords[index][field]} onChange={(e) => updateWord(index, field, e)} /></td>)}
                            <td className="row-content row-content-buttons">
                                <button className="row-button-save row-button" disabled={editedWords[index].errors?.length > 0} onClick={() => saveWord(index)}></button>
                                <button className="row-button-edit row-button" onClick={() => editWord(index)}></button>
                                <button className="row-button-delete row-button" onClick={() => deleteWord(index)}></button>
                            </td>
                        </tr>
                        : <tr key={index}>
                            <td className="row-content">{word.hebrew}</td>
                            <td className="row-content">{word.english}</td>
                            <td className="row-content">{word.transcription}</td>
                            <td className="row-content row-content-buttons">
                                <button className="row-button-edit row-button" disabled={word.author == null} onClick={() => editWord(index)}></button>
                                <button className="row-button-delete row-button" disabled={word.author == null} onClick={() => deleteWord(index)}></button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Table;