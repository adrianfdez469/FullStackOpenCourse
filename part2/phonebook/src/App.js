import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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