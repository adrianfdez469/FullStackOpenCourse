import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    /*vote(state, action){
      return state.map(a => a.id !== action.payload ? a : { ...a, votes: a.votes + 1 }) 
    },*/
    editAnecdote(state, action){
      return state.map(a => a.id !== action.payload.id ? a : action.payload)
    },
    addAnecdote(state, action){
      return [...state, action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { addAnecdote, setAnecdotes, editAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdotesService.getAll()
    dispatch(setAnecdotes(response))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdotesService.createNew(content)
    dispatch(addAnecdote(response))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.saveVote(id)
    console.log(votedAnecdote);
    dispatch(editAnecdote(votedAnecdote))
  }
} 

export default anecdoteSlice.reducer