import { useState } from "react";
import "../table/table.scss"

function Table(props) {
    const [words, updateWords] = useState(props.words);
    const [editedWords, updateEditedWords] = useState({});
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
        word[fieldName] = e.target.value;
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
        words.splice(index, 1)
        updateWords([...words]);
    };
    const saveWord = (index) => {
        const updateWord = editedWords[index];
        words[index] = updateWord;
        editWord(index);
    }
    return (
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
                    ? <tr>
                        <td className="row-content"><input type="text" value={editedWords[index].hebrew} onChange={(e) => updateWord(index, "hebrew", e)} /></td>
                        <td className="row-content"><input type="text" value={editedWords[index].english} onChange={(e) => updateWord(index, "english", e)} /></td>
                        <td className="row-content"><input type="text" value={editedWords[index].transcription} onChange={(e) => updateWord(index, "transcription", e)} /></td>
                        <td className="row-content row-content-buttons">
                            <button className="row-button-save row-button" onClick={() => saveWord(index)}></button>
                            <button className="row-button-edit row-button" onClick={() => editWord(index)}></button>
                            <button className="row-button-delete row-button" onClick={() => deleteWord(index)}></button>
                        </td>
                    </tr>
                    : <tr key={index}>
                        <td className="row-content">{word.hebrew}</td>
                        <td className="row-content">{word.english}</td>
                        <td className="row-content">{word.transcription}</td>
                        <td className="row-content row-content-buttons">
                            <button className="row-button-edit row-button" onClick={() => editWord(index)}></button>
                            <button className="row-button-delete row-button" onClick={() => deleteWord(index)}></button>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    )
}

export default Table;