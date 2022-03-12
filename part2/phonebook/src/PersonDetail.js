import React from 'react';

const PersonDetail = ({person, onDeletePerson}) => {

  return (
    <div>
      {`${person.name} - ${person.number}`}
      <button onClick={() => onDeletePerson(person)}>delete</button>
    </div>

  );

}
export default PersonDetail;