import { useState } from 'react'
// Component button
const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}> {text} </button>
  )
}
// component max votes
  // function max votes
  const MaxVotes = ({points, anecdotes}) => {
    var result = points.indexOf(Math.max(...points));
    //console.log(result)
    return (
     <p>{anecdotes[result]}</p>
    )
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // Define our states
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length)) //new Uint8Array(anecdotes.length)

  // Function to increase the score of the displayed anecdote
  const vote = (selected) => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
    //console.log(points)
  }

  // Function to generate a new annecdote index ** todo -> prevent following duplicate
  const randIndex = (anecdotes) => {
    const indexNum = Math.floor(Math.random() * anecdotes.length)
    return (
      indexNum
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <Button text={'Vote'} onClick={() => vote(selected)} />
      <Button text={'Next anecdote'} onClick={() => setSelected(randIndex(anecdotes))} />
      <h2>Anecdote with most votes</h2>
      <MaxVotes points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App