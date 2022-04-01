import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (text) => {
  const anecdote = {
    "content": text,
    "id": (100000 * Math.random()).toFixed(0),
    "votes": 0
  }
  const response = await axios.post(url, anecdote)
  return response.data
}

export { getAll, createNew }