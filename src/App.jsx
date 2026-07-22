import {useState} from 'react'
import LandingPage from './components/landingpage'
import {fetchQuestions} from './api/fetchQuestions'
import Quiz from './components/quiz'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <div className="App">
      {gameStarted
       ? <Quiz finishQuiz={()=>setGameStarted(false)}/>
       : <LandingPage startQuiz={()=>setGameStarted(true)} />
       }
    </div>
  )
}

export default App