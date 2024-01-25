import React from 'react';
import './style/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import New from './pages/New';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Endgame from './pages/Endgame';
import GenericErrorBoundary from './error-boundaries/generic-error';


function App() {
    return (
        <div className="app flex">
            <Header/>
            <main>
                <BrowserRouter basename="/quizApp">
                    <Routes>
                        <Route path="/" element={<New />}></Route>
                        <Route path="/game" element={<GenericErrorBoundary><Game/></GenericErrorBoundary>}></Route>
                        <Route path="/endgame" element={Endgame}></Route>
                        <Route path="*" element={<Navigate replace to="/" />}></Route>
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
