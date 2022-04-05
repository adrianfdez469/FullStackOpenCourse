import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (payload, token) => {

  const request = axios.post(baseUrl, payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return request
    .then(resp => resp.data)
}

const updateBlog = (blogId, payload) => {
  const url = `${baseUrl}/${blogId}`
  const request = axios.put(url, payload)
  return request.then(resp => resp.data)
}

const modifyBLog = (blogId, payload) => {
  const url = `${baseUrl}/${blogId}`
  const request = axios.patch(url, payload)
  return request.then(resp => resp.data)
}

const deleteBlog = (blogId, token) => {
  const url = `${baseUrl}/${blogId}`
  return axios.delete(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(resp => resp.data)
}

const commentBlog = (blogId, comment) => {
  const url = `${baseUrl}/${blogId}/comments`
  return axios.post(url, {
    comment
  }).then(resp => resp.data)
}

const exp = {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  modifyBLog,
  commentBlog
}

export default exp