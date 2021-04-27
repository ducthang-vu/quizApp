import React from 'react';
import './style/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import New from './pages/New';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Endgame from './pages/Endgame';
import GenericErrorBoundary from './error-boundaries/generic-error';


function App() {
    return (
        <div className="app flex">
            <Header/>
            <main>
                <BrowserRouter basename="/quizApp">
                    <Switch>
                        <Route exact path="/">
                            <New />
                        </Route>
                        <Route exact path="/game">
                            <GenericErrorBoundary><Game /></GenericErrorBoundary>
                        </Route>
                        <Route exact path="/endgame">
                            <Endgame />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
