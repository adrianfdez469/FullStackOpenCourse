import React from 'react';
import PersonDetail from './PersonDetail';

const Persons = ({persons, filter, onDeletePerson}) => {

  return persons
  .filter(per => per.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) )
  .map(per => {
    return <PersonDetail person={per} key={per.name} onDeletePerson={onDeletePerson}/>
  });

}
export default Persons;