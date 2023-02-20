import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Stat = ({text, value}) => {
  return(
    <p> {[text, value]} </p>
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
      <Stat text={'Good '} value={good} />
      <Stat text={'neutra l'} value={neutral} />
      <Stat text={'bad '} value={bad} />
    </>


  )
}

export default App