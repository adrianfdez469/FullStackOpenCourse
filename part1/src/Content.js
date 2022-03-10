import React from 'react';
import Part from './Part';

const Content = ({part1,part2,part3,exercises1, exercises2, exercises3}) => {

  return (
    <>
      <Part name={part1} number={exercises1}/>
      <Part name={part2} number={exercises2}/>
      <Part name={part3} number={exercises3}/>
    </>
  )

}
export default Content;