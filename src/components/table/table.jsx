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
    const RootStore = props;
    return (
        <>
            <TopicSelector></TopicSelector>
            <table className="table-container">
                <thead className="columns-container">
                    <tr className="columns">
                        <th className="column-name">hebrew</th>
                        <th className="column-name">english</th>
                        <th className="column-name">transcription</th>
                        <th> <button className="add-word-button row-button" onClick={RootStore.addWord}>add new word</button></th>
                    </tr>
                </thead>
                <tbody className="rows-container">
                    {RootStore.words.map((word, index) => word.isEdit
                        ? <tr key={index}>
                            {RootStore.fields.map((field) =>
                                <td className="row-content" key={RootStore.field}><input type="text" className={RootStore.editedWords[index].errors?.includes(field) ? "has-error" : ""} value={RootStore.editedWords[index][field]} onChange={(e) => RootStore.updateWord(index, field, e)} /></td>)}
                            <td className="row-content row-content-buttons">
                                <button className="row-button-save row-button" disabled={RootStore.editedWords[index].errors?.length > 0} onClick={() => RootStore.saveWord(index)}></button>
                                <button className="row-button-edit row-button" onClick={() => RootStore.editWord(index)}></button>
                                <button className="row-button-delete row-button" onClick={() => RootStore.deleteWord(index)}></button>
                            </td>
                        </tr>
                        : <tr key={index}>
                            <td className="row-content">{word.hebrew}</td>
                            <td className="row-content">{word.english}</td>
                            <td className="row-content">{word.transcription}</td>
                            <td className="row-content row-content-buttons">
                                <button className="row-button-edit row-button" disabled={RootStore.word.author == null} onClick={() => RootStore.editWord(index)}></button>
                                <button className="row-button-delete row-button" disabled={RootStore.word.author == null} onClick={() => RootStore.deleteWord(index)}></button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Table;