import React from 'react';

const Filter = ({filter, onChangeFilter}) => {

  return <div>Filter: <input value={filter} onChange={(e) => onChangeFilter(e)} /></div>

}
export default Filter;