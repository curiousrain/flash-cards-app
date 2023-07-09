import { useState, forwardRef } from "react";
import "../flashCards/flashCards.scss"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import TopicSelector from "../topicSelector/topicSelector";

const FlashCard = forwardRef(({ word, cardViewed }, ref) => {

    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed);
        cardViewed();
    };
    return (
        <>
            <TopicSelector></TopicSelector>
            <Card className="flash-card-container" >
                <div className="flash-card-front">
                    <p className="word-hebrew">{word.hebrew}</p>
                    <p className="word-transcription">{word.transcription}</p>
                </div>
                <Button className="flash-card-button" onClick={handleChange} ref={ref}> See translation</Button>
                <div className={"flash-card-back " + (pressed ? "" : "hidden")}>
                    <p className="word-english">{word.english}</p>
                </div>
            </Card >
        </>
    )
});

export default FlashCard;