import SwitchCard from "../switchCard/switchCard";
import colors from "../wordsByTopic/colors-words.json";
import general from "../wordsByTopic/general-words.json";
import clothes from "../wordsByTopic/clothes-words.json";
import food from "../wordsByTopic/food-drinks-words.json";
import "../game/game.scss"

export default function Game() {
    return (
        <>
            <div className="card-container">
                <SwitchCard words={colors}></SwitchCard>
            </div>
            <div className="other-topics-card">
            </div>
        </ >
    )
}