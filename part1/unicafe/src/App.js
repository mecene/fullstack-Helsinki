import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ value }) => {
  //console.log(props)
  return (
    <>
      <StatisticLine text={'Good '} value={value.good} />
      <StatisticLine text={'Neutral '} value={value.neutral} />
      <StatisticLine text={'Bad '} value={value.bad} />

      <StatisticLine text={'All '} value={value.good + value.neutral + value.bad} />
      <StatisticLine text={'Average '} value={(value.good - value.bad) / (value.good + value.neutral + value.bad)} />
      <StatisticLine text={'Positive '} value={`${(value.good * 100) / (value.good + value.neutral + value.bad)} % `} />
    </>
  )
}
const StatisticLine = ({ text, value }) => {
  //console.log(props)
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>
        Give feedback
      </h1>
      <Button handleClick={() => setGood(good + 1)} text={'Good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'Bad'} />
      <h2>
        Statistics
      </h2>
      <Statistics value={{ good, neutral, bad }} />
    </>

  )
}

export default App