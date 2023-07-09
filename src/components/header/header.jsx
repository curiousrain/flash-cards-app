
import "../header/header.scss"
import {
    Link
} from "react-router-dom";
import { Button } from 'primereact/button';
import { UserContext } from "../userContext/userContext";
import { useContext } from "react";

export default function Header() {
    const { user, login, logout } = useContext(UserContext);
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
                    <li>
                        {
                            user === null
                                ? <Button label="Login" onClick={login}></Button>
                                : <Button label="Logout" onClick={logout}></Button>
                        }
                    </li>
                    <li>
                        {user?.displayName}
                    </li>
                </ul>
            </nav>
        </header>
    )
}
