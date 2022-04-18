import React from 'react'
import { CoursePart } from './types'

type Props = {
  courseParts: CoursePart[]
}

const Total = (props: Props) => {

  return (
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )

}
export default Total