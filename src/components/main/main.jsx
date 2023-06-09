import Table from "../table/table"
import colors from "../wordsByTopic/colors-words.json"
import general from "../wordsByTopic/general-words.json"
import clothes from "../wordsByTopic/clothes-words.json"
import food from "../wordsByTopic/food-drinks-words.json"
import "../main/main.scss"
function MainPage() {
    const allWords = colors.concat(general, clothes, food);
    return (
        <div className="main-container">
            <div className="words-table-container">
                <Table words={allWords}></Table>
            </div>
        </div>
    )
}

export default MainPage