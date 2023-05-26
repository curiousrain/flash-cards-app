import { useState } from "react";
import "../flashCards/flashCards.scss"
function FlashCard(props) {
    const { word } = props;
    const [pressed, setPressed] = useState(false);
    const handleChange = () => {
        setPressed(!pressed)
    };
    return (
        <div className="flash-card-container">
            <div className="flash-card-front">
                <p className="word-hebrew">{word.hebrew}</p>
                <p className="word-transcription">{word.transcription}</p>
            </div>
            <button className="flash-card-button" onClick={handleChange}>See translation</button>
            <div className={"flash-card-back " + (pressed ? "" : "hidden")}>
                <p className="word-english">{word.english}</p>
            </div>
        </div >
    )
}

export default FlashCard;