import './App.css';
import MainPage from './components/main/main';
import Header from './components/header/header';
import Game from './components/game/game';
import Page404 from './components/page404/page404'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <>
        <Header></Header>
        <Routes>
          <Route exact path="/game" element={<Game />} />
          <Route path="/" element={<MainPage />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </>
    </Router>

  );
}
export default App;
