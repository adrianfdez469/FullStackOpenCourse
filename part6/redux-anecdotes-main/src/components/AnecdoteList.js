import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAction(id))
  }

  return anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
}

export default AnecdoteList;