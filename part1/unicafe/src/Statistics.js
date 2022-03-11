import React from 'react';

const Statistics = props => {

  const {good, neutral, bad} = props;

  const all = good + neutral + bad;
  const getAvg = () => good / all - bad / all;
  const getPos = () => good * 100 / all;

  return (
    <>
      <h1>Statistics</h1>
      <div>Good {good}</div>
      <div>Neutral {neutral}</div>
      <div>Bad {bad}</div>
      <div>All {all}</div>
      <div>Average {getAvg()}</div>
      <div>Positive {getPos()}</div>

    </>
  );

}
export default Statistics;