import React from 'react';

const Statistics = props => {

  const {good, neutral, bad} = props;

  
  return (
    <>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </>
  );

}
export default Statistics;