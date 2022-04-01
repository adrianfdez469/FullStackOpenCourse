import React from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const dispatch = useDispatch()

  const createAnecdoteHandler = async (event) => {
    event.preventDefault()
    const text = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    
    dispatch(createAnecdote(text))
    dispatch(setNotification(`Created: ${text}`, 5))
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