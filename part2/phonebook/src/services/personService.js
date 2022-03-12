import axios from 'axios';

const basePersonUrl = '/api/persons';


const getAll = () => {
  return axios.get(basePersonUrl)
          .then(resp => resp.data)
}

const create = (person) => {
  return axios.post(basePersonUrl, person)
    .then(resp => resp.data)
}

const remove = (id) => {
  return axios.delete(`${basePersonUrl}/${id}`)
    .then(resp => {
      return resp.status
    })
}

const update = (id, newPerson) => {
  return axios.put(`${basePersonUrl}/${id}`, newPerson)
    .then(resp => resp.data)
    
}

const service = { getAll, create, remove, update }

export default service