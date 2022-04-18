import React from 'react'
import Part from './Part'
import { CoursePart } from './types'

type Props = {
  parts: CoursePart[]
}

const Content = (props: Props) => {

  return (
    <div>
      {props.parts.map(part => {
        return <div key={part.name}><Part part={part} /><br/></div>
      })}
    </div>
  )

}
export default Content