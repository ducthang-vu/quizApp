import React, { useState, useEffect } from 'react'
import './style/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import MainContent from './containers/MainContent'
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
      .then(response => setQuestions(response.data.results)) 
  }, [])  // no catch

  return (
    <div className="app flex">
        <Header/>
        <main>
          { questions.length ? <MainContent questions={questions}/> : <Spinner/> }
        </main>
        <Footer/>
    </div>
  );
}

export default App;
