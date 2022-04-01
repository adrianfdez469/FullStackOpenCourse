import React from 'react';
import { useDispatch } from 'react-redux'
import { createNew } from '../services/anecdotes'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const dispatch = useDispatch()

  const createAnecdoteHandler = async (event) => {
    event.preventDefault()
    const text = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    const anecdote = await createNew(text)
    
    dispatch(addAnecdote(anecdote))
    dispatch(showNotification(text))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdoteHandler}>
        <div><input name='anecdoteInput'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;