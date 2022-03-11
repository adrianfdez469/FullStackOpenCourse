import React from 'react';

const Buttons = ({goodHandler, neutralHandler, incBad}) => {

  return (
    <>
      <button onClick={goodHandler}>Good</button>
      <button onClick={neutralHandler}>Neutral</button>
      <button onClick={incBad}>Bad</button>
    </>
  );

}
export default Buttons;