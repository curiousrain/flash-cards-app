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
import React, { useEffect } from 'react';
import { getWords } from './components/firebaseInnit/firebase';
// import colors from "./components/wordsByTopic/colors-words.json";
// import clothes from "./components/wordsByTopic/clothes-words.json";
// import food from "./components/wordsByTopic/food-drinks-words.json";
function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // addWords(colors, 'colors');
  //     await getWords()
  //   }
  //   fetchData()
  //     .catch(console.error);
  // }, [])
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
