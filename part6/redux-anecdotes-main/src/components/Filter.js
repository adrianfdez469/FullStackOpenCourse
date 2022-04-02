import React from 'react';
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = props => {

  return (
    <div> 
      Filter:
      <input type='text' onChange={({target}) => props.filter(target.value)}></input> 
    </div>
  );
}

const mapDispatchToProps = {
  filter
}

const conectedFilter = connect(null, mapDispatchToProps)(Filter)


export default conectedFilter;