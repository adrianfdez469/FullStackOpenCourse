import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

import personService from './services/personService'

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
      if(window.confirm(`${exists.name} is already added to phonebook, replace the old number with a new one?`)){
        const newPerson =  {...exists, number: newPhone};
        personService.update(exists.id, newPerson)
          .then(data => {
            console.log(data);
            setPersons(persons.map(p => p.id !== exists.id ? p : newPerson));
          })
          .catch(err => {
            console.log(err);
            alert('Error')
          })
      }
    } else {
      const newPerson = {name:newName, number: newPhone}
      personService.create(newPerson)
        .then(p => {
          setPersons([...persons, p])
        })
        .catch(err => {
          console.log(err)
          alert('Error')
        })
    }
  }

  const onDeletePerson = (person) => {
    if(window.confirm(`Are you sure you want to delete ${person.name}`)){
      personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(err => {
          console.log(err)
          alert('Error')
        })
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(persons => setPersons(persons))
      .catch(err => {
        console.log(err)
        alert('Error')
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
      <Persons persons={persons} filter={filter} onDeletePerson={onDeletePerson}/>
      
    </div>
  )
}

export default App