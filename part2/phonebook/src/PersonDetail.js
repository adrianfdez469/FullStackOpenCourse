import React from 'react';

const PersonDetail = ({person}) => {

  return <div>{`${person.name} - ${person.number}`}</div>;

}
export default PersonDetail;