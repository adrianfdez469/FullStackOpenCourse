import { useState } from 'react'
import Header from './Header';
import Buttons from './Buttons';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => setGood(good+1)
  const incNeutral = () => setNeutral(neutral+1)
  const incBad = () => setBad(bad+1)

  return (
    <div>
      <Header />
      <Buttons 
        goodHandler={incGood}
        neutralHandler={incNeutral}
        badHandler={incBad}
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App