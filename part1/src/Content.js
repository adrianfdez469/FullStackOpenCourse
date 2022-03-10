import React from 'react';
import Part from './Part';

const Content = ({part1,part2,part3}) => {

  return (
    <>
      <Part name={part1.name} number={part1.exercises}/>
      <Part name={part2.name} number={part2.exercises}/>
      <Part name={part3.name} number={part3.exercises}/>
    </>
  )

}
export default Content;