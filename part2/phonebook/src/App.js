import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const onChangeFilter = (event) => {
    const filterTxt = event.target.value;
    setFilter(filterTxt)
  }
  const onNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const formSubmit = (event) => {
    event.preventDefault()
    const exists = persons.find(p => p.name === newName)
    if(exists){
      alert(`${exists.name} is already added to phonebook.`);
    } else {
      setPersons([...persons, {name:newName, number: newPhone}])
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(resp => {
        console.log(resp);
        setPersons(resp.data);
      })
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} onChangeFilter={onChangeFilter}/>
      <h2>Add contact</h2>
      <PersonForm 
        newName={newName} 
        newPhone={newPhone} 
        formSubmit={formSubmit} 
        onNameChange={onNameChange} 
        onPhoneChange={onPhoneChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
      
    </div>
  )
}

export default App