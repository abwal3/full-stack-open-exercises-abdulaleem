import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // 1. Memory for the currently displayed anecdote (starts at index 0)
  const [selected, setSelected] = useState(0)
  
  // 2. Memory for the votes. Creates an array of zeros matching the length of anecdotes.
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Exercise 1.12: Pick a random anecdote
  const handleNext = () => {
    // Generate random number between 0 and the length of the array
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // Exercise 1.13: Vote for the current anecdote
  const handleVote = () => {
    // React Rule: Never modify state directly. Make a copy first.
    const copy = [...votes]
    // Add 1 to the vote count at the currently selected index
    copy[selected] += 1
    // Update the state with the modified copy
    setVotes(copy)
  }

  // Exercise 1.14: Find the most voted anecdote
  const maxVotes = Math.max(...votes) 
  const mostVotedIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      {/* Optional safety check: Only show if at least one vote exists */}
      {maxVotes > 0 ? (
        <>
          <p>{anecdotes[mostVotedIndex]}</p>
          <p>has {maxVotes} votes</p>
        </>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App