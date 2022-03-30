import React from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {

  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdoteAction(text))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdoteInput'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;