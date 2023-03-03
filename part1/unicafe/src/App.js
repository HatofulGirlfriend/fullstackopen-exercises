import { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
    <div>
     <h1>statistics</h1>
      No feedback given
    </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {good + neutral + bad}<br />
        average {(good - bad) / (good + neutral + bad)}<br />
        positive {good / (good + neutral + bad) * 100} %<br />
      </p>
    </div>
  )
}


const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const goodFeedback = () => {
    setGood(good + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
  }
console.log(good)
  return (
    <>
    <div>
      <h1>give feedback</h1>
      <button onClick={goodFeedback}>Good</button>
      <button onClick={neutralFeedback}>Neutral</button>
      <button onClick={badFeedback}>Bad</button>
    </div>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App