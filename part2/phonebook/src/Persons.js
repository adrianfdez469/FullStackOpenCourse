import React from 'react';
import PersonDetail from './PersonDetail';

const Persons = ({persons, filter}) => {

  return persons
  .filter(per => per.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) )
  .map(per => {
    return <PersonDetail person={per} key={per.name}/>
  });

}
export default Persons;