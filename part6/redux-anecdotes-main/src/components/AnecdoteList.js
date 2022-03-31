import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => [...anecdotes]
    .filter(a => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)
  )

  const voteHandler = ({id, content}) => {
    dispatch(vote(id))
    dispatch(showNotification(content))
  }

  return anecdotes.map(anecdote =>  
       (<div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
      </div>)
    )
  
    
}

export default AnecdoteList;