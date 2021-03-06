import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostPopular, setPopular] = useState({pos: -1, votes: 0})

  const setRandomAnecdote = () => {
    let randomPos = selected;
    
    while (randomPos === selected) {
      randomPos = Math.round(Math.random() * (anecdotes.length-1))
    }
    setSelected(randomPos);
  }
  const voteAnecdotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1;
    if(newVotes[selected] > mostPopular.votes){
      setPopular({
        pos: selected,
        votes: newVotes[selected]
      });
    }
    setVotes(newVotes);
  }

  return (
    <>
      <h1>Acecdore of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <button onClick={() => voteAnecdotes()}>Vote</button>
      <button onClick={() => setRandomAnecdote()}>Next anecdote</button>
      {mostPopular.pos >= 0 &&
      <>
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[mostPopular.pos]}</div>
        <div>Has {mostPopular.votes} votes</div>

      </>
      }
    </>
  )
}

export default App