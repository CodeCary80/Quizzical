import {useState,useEffect} from "react"
import {fetchQuestions} from "../api/fetchQuestions"

function decodeHtml(html){
    const text = document.createElement('textarea')
    text.innerHTML = html
    return text.value
}

function shuffle(array){
    return [...array].sort(()=>Math.random() - 0.5)
}



export default function Quiz({finishQuiz}) {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    const [checked, setChecked] = useState(false)
    const [loading,setLoading] = useState(true)

    function handleCheckAnswers(){
    setChecked(true)
}

    useEffect(() => {
        const startTime = Date.now()
        const MIN_LOADING_TIME = 1500

        fetchQuestions().then((data) => {
            const formatted = data.map((question) => ({
            question: decodeHtml(question.question),
            correct_answer: decodeHtml(question.correct_answer),
            options: shuffle([question.correct_answer, ...question.incorrect_answers]).map(decodeHtml),
            }))

            const elapsed = Date.now() - startTime
        const remaining = MIN_LOADING_TIME - elapsed

        if (remaining > 0) {
            setTimeout(() => {
                setQuestions(formatted)
                setLoading(false)
            }, remaining)
        } else {
            setQuestions(formatted)
            setLoading(false)
        }
    })
        
        }, [])

    function selectAnswer(questionIndex,option){
        setAnswers((prev)=>({...prev,[questionIndex]:option}))
    }

    const score = questions.reduce((total,question,index)=>{
        return answers[index] === question.correct_answer ? total + 1 : total 
    },0)

    function getScoreGlass(score,total){
        const percentage = score/total
        if(percentage >= 0.6) return "score-good"
        return "score-bad"
    }

    if(loading){
        return (
            <div className="question-loader" role="status" aria-live="polite">
                <p className="loading-text">Loading</p>
                <p className="loading-message">Building your quiz</p>
            </div>
        )
    }

    return(
        <div className="quiz">
            {questions.map((question,index)=>{

                return(
                    <div key={index} className="question-block">
                        <h2>{question.question}</h2>
                        <div className="options">
                            {question.options.map((option)=>{
                                const isSelected = answers[index] === option
                                const isCorrected = option === question.correct_answer

                                let className = 'option'
                                if(isSelected) className += ` selected`
                                if(checked && isCorrected) className += ` correct`
                                if(checked && isSelected && !isCorrected) className += ` incorrect`

                                return(
                                    <button 
                                    key={option}
                                    className={className}
                                    onClick={()=>selectAnswer(index,option)}
                                    >
                                        {option}   
                                    </button>
                                ) 
                            })}
                        </div>
                    </div>
                )
            })}

            {!checked ? (
                <button className="check-answers" onClick={handleCheckAnswers}>
                    Check answers
                </button>
            ) : (
                <div className="results">
                      <p>You scored <span className={getScoreGlass(score, questions.length)}>{score}</span>/{questions.length} correct answers </p>
                      <button className="play-again" onClick={finishQuiz} >
                            Play again
                      </button>
                </div>
            )}
        </div>
    )
}