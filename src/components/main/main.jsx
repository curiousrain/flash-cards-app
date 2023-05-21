import Table from "../table/table"
import FlashCard from "../flashCards/flashCards"
import colors from "../wordsByTopic/colors-words.json"
import general from "../wordsByTopic/general-words.json"
import clothes from "../wordsByTopic/clothes-words.json"
import food from "../wordsByTopic/food-drinks-words.json"
import "../main/main.scss"
function MainPage() {
    const allWords = colors.concat(general, clothes, food);
    return (
        <div className="main-container">
            <header className="main-nav">
                <h1 className="nav-title">Flash Learning Hebrew!</h1>
                <div className="nav">
                    <a className="nav-item" href="#">Dictionary</a>
                    <div>

                    </div>
                </div>
            </header>
            <div className="card-container">
                <FlashCard word={colors[0]}></FlashCard>
            </div>
            <div className="other-topics-card">
            </div>
            <div className="words-table-container">
                <Table words={allWords}></Table>

            </div>
        </div>
    )
}

export default MainPage