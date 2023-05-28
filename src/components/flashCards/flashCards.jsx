import { useState } from "react";
import "../flashCards/flashCards.scss"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";

function FlashCard(props) {
    const { word } = props;
    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed)
    };
    return (
        <Card >
            <div className="flash-card-front">
                <p className="word-hebrew">{word.hebrew}</p>
                <p className="word-transcription">{word.transcription}</p>
            </div>
            <Button className="flash-card-button" onClick={handleChange}> See translation</Button>
            <div className={"flash-card-back " + (pressed ? "" : "hidden")}>
                <p className="word-english">{word.english}</p>
            </div>
        </Card>
    )
}

export default FlashCard;