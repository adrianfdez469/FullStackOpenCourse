import React from 'react';
import Part from './Part';

const Content = (props) => {

  return (
    <>
      {props.parts.map(p => {
        return <Part key={p.id} name={p.name} number={p.exercises} />
      })}
    </>
  )

}
export default Content;