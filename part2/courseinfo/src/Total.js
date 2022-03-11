import React from 'react';

const Total = ({parts}) => {
  
  const total = parts.reduce((acum, el) => {
    acum += el.exercises
    return acum;
  },0)
  return <p>Number of exercises: <b>{total}</b></p>
}
export default Total;