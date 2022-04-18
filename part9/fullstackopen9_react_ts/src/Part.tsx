import { CoursePart } from './types'

interface Props {
  part: CoursePart
}

const Part = (props: Props) => {

  switch(props.part.type){
    case "normal":
      return <div><b>{props.part.name} {props.part.exerciseCount}</b><div>{props.part.description}</div></div>
    case "groupProject":
      return <div><b>{props.part.name} {props.part.exerciseCount}</b><div>Project exercises: {props.part.groupProjectCount}</div></div>
    case "submission":
      return <div><b>{props.part.name} {props.part.exerciseCount}</b><div>{props.part.description}</div><div>Submiting to: {props.part.exerciseSubmissionLink}</div></div>
    case "special":
      return <div><b>{props.part.name} {props.part.exerciseCount}</b><div>{props.part.description}</div><div>Required skills: {props.part.requirements.join(', ')}</div></div>
      
    
  }
}
export default Part