import React from 'react';
import Button from './Button';

const Buttons = ({goodHandler, neutralHandler, badHandler}) => {

  return (
    <>
      <Button text='Good' handler={goodHandler}/>
      <Button text='Neutral' handler={neutralHandler}/>
      <Button text='Bad' handler={badHandler}/>
    </>
  );

}
export default Buttons;