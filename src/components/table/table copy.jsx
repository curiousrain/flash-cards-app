import { useState } from "react";
import "../table/table.scss"
import TopicSelector from "../topicSelector/topicSelector";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function Table(props) {
    const [updateWords] = useState(props.words);
    const [editedWords, updateEditedWords] = useState({});
    const { words } = useContext(WordsContext);
    const [word, setWord] = useState([]);

    useEffect(() => {
        ProductService.getWord().then(data => setWord(data));
    }, []);
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
        words.splice(index, 1)
        updateWords([...words]);
    };
    const saveWord = (index) => {
        const updateWord = editedWords[index];
        const fieldValidation = /[a - zA - Z\u0590 -\u05FF\u200f\u200e] + ((([-, \.\s] +) ? [a - zA - Z\u0590 -\u05FF\u200f\u200e] +) ?) +/;
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
        words[index] = updateWord;
        editWord(index);
    }
    return (
        <>
            <TopicSelector></TopicSelector>
            <div className="words-table">
                <DataTable value={word} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="hebrew" header="Hebrew"></Column>
                    <Column field="transcription" header="Transcription"></Column>
                    <Column field="english" header="English"></Column>
                </DataTable>
            </div>
        </>
    )
}

export default Table;