import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const createAnecdoteHandler = async (event) => {
    event.preventDefault()
    const text = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    
    props.createAnecdote(text)
    props.showNotification({ message: `Created: ${text}`, time: 5 })
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification
}


export default connect(null, mapDispatchToProps)(AnecdoteForm);