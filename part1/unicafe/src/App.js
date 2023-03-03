import { useState } from "react"

const StatisticsLine = ({ text, value }) => {
  return ( 
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const positivePercentage = `${good / (good + neutral + bad) * 100}%`
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
    <div>
     <h1>statistics</h1>
      No feedback given
    </div>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={good + neutral + bad} />
          <StatisticsLine text="Average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticsLine text="Positive" value={positivePercentage} />
        </tbody>
      </table>
    </>
  )

}

const Button = ({ handleClick, text }) => (
 <button onClick={handleClick}>{text}</button>
)



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
  return (
    <>
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} text="Good" />
      <Button handleClick={neutralFeedback} text="Neutral" />
      <Button handleClick={badFeedback} text="Bad" />
    </div>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App