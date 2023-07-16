
import "../header/header.scss"
import {
    Link
} from "react-router-dom";
import { Button } from 'primereact/button';
import { UserContext } from "../userContext/userContext";
import { useContext } from "react";

export default function Header(props) {
    const RootStore = props;
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
                            RootStore.user === null
                                ? <Button label="Login" onClick={RootStore.login}></Button>
                                : <Button label="Logout" onClick={RootStore.logout}></Button>
                        }
                    </li>
                    <li>
                        {RootStore.user?.displayName}
                    </li>
                </ul>
            </nav>
        </header>
    )
}
