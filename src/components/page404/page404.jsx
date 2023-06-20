import "../page404/page404.scss";
import {
    Link
} from "react-router-dom";
export default function Page404() {
    return (
        <div className="page-container">
            <h2 className="page-title">Looks like you're out of touch with this page. Keep on dancing and we'll get you back on track!</h2>
            <p className="page-text">404 Page Not Found</p>
            <img src="assets/images/out-of-touch.gif" alt="" className="page-image" />
            <p className="page-text">You can find your favorite tune on our <Link to="/" className="page-link">Home</Link> or <Link to="/game" className="page-link">Game</Link> pages!</p>
        </div>
    )
}