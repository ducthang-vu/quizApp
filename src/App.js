import React, { useState, useEffect } from 'react'
import './style/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import MainWaiting from './components/MainWaiting'
import MainContent from './components/MainContent'
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
      .then(response => setQuestions(response.data.results)) 
  }, [])  // no catch

  return (
    <div className="app flex">
        <Header></Header>
        <main>
          {questions.length ? 
            <MainContent questions={questions}></MainContent> : 
            <MainWaiting></MainWaiting>}
        </main>
        <Footer></Footer>
    </div>
  );
}

export default App;
