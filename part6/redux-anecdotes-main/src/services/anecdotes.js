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

const saveVote = async (id) => {
  const { data: anecdote} = await axios.get(`${url}/${id}`)
  const votedAnecdote = await axios.patch(`${url}/${id}`, { votes: anecdote.votes + 1})
  return votedAnecdote.data
}

const service = { getAll, createNew, saveVote }
export default service 