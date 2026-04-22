import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
   <>
     <Title />
     <Button text="good" onClick={() => setGood(good + 1)}/>
     <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
     <Button text="bad" onClick={() => setBad(bad + 1)}/>
     
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

   </>
  )
}

const Title = () => {
 
  return (
   <h1>give feedback</h1>
  )
}
const Button = (props) => {
 
  return (
    <button onClick={props.onClick}> {props.text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  const average = (props.good - props.bad) / total
  const positivePercentage = (props.good / total) * 100 + " %"

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positivePercentage} />
      </tbody>
    </table>
  )
}
export default App

