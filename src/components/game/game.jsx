import SwitchCard from "../switchCard/switchCard";
import colors from "../wordsByTopic/colors-words.json";
import general from "../wordsByTopic/general-words.json";
import clothes from "../wordsByTopic/clothes-words.json";
import food from "../wordsByTopic/food-drinks-words.json";
import { WordsContext } from '../wordsContext/wordsContext';
import "../game/game.scss"
import { useContext } from "react";

export default function Game() {
    const { words } = useContext(WordsContext);
    return (
        words.length === 0
            ?
            <div>
                Loading
            </div>
            :
            <>
                <div className="card-container">
                    <SwitchCard words={words}></SwitchCard>
                </div>
                <div className="other-topics-card">
                </div>
            </ >
    )
}