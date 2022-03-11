import React from 'react';

const PersonForm = ({newName, newPhone, formSubmit, onNameChange, onPhoneChange}) => {

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        name: <input value={newName} onChange={(e) => onNameChange(e)}/>
      </div>
      <div>number: <input value={newPhone} onChange={(e) => onPhoneChange(e)}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

}
export default PersonForm;