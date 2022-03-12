import React from 'react';

const Filter = props => {

  return (
    <div>
      Find countries: <input type="text" {...props}></input>
    </div>
  );

}
export default Filter;