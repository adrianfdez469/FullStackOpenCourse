import React from 'react';
import StatitsticLine from './StatisticLine';

const Statistics = props => {

  const { good, neutral, bad } = props;

  const all = good + neutral + bad;
  const getAvg = () => good / all - bad / all;
  const getPercentage = () => good * 100 / all;

  if (all === 0)
    return <p>No feedback given</p>

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatitsticLine text={'Good'} data={good} />
          <StatitsticLine text={'Neutral'} data={neutral} />
          <StatitsticLine text={'Bad'} data={bad} />
          <StatitsticLine text={'Average'} data={getAvg()} />
          <StatitsticLine text={'Positive'} data={getPercentage()} />
        </tbody>
      </table>
    </>
  );

}
export default Statistics;