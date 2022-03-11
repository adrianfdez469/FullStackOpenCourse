import React from 'react';
import Part from './Part';

const Content = (props) => {

  return (
    <>
      <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} number={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} number={props.parts[2].exercises}/>
    </>
  )

}
export default Content;