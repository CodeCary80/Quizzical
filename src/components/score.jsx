export default function LandingPage(props) {
    return (
        <div className="landing-page">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}