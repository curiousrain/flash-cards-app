
import "../header/header.scss"
import {
    Link
} from "react-router-dom";

export default function Header() {
    return (
        <header className="general-header">
            <img src="assets/images/hebrew.png" alt="logo" className="logo-image" />
            <h1 className="header-title">Flash Learning Hebrew!</h1>
            <nav className="header-nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/game">Game</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
