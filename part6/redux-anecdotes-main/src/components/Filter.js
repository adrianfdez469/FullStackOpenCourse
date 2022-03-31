import React from 'react';
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = props => {

  const dispatch = useDispatch()

  return (
    <div> 
      Filter:
      <input type='text' onChange={({target}) => dispatch(filter(target.value))}></input> 
    </div>
  );

}
export default Filter;