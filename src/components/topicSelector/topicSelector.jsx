import React, { useContext, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { WordsContext } from '../wordsContext/wordsContext';

function TopicSelector(props) {
    const topics = [
        { name: 'Clothes', value: 'clothes' },
        { name: 'Colors', value: 'colors' },
        { name: 'Food', value: 'food' }
    ];
    const { updateTopic, topic } = useContext(WordsContext);
    return (
        <div className="card flex justify-content-center">
            <Dropdown value={topic} onChange={(e) => updateTopic(e.value)} options={topics} optionLabel="name"
                placeholder="Select a topic" className="w-full md:w-14rem" />
        </div>
    )

}

export default TopicSelector;