export interface IResume {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type Args = {
  array: number[],
  number: number
}

const parseArrayArgs = (args: Array<string>): Args  => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  const array = args.slice(2, args.length-1)
  const number = Number(args[args.length-1])

  if(array.every(n => !isNaN(Number(n))) && !isNaN(number)){
    return {
      array: array.map(n => Number(n)), 
      number
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateExercises  = (exercises: number[], target: number): IResume => {


  const total_hours = exercises.reduce((acum, val) => {
    return acum + val
  }, 0)
  const periodLength = exercises.length
  const average = total_hours / periodLength
  const trainingDays = exercises.filter(x => x).length
  const success = average >= target
  const rating = average / target //Dont know how to calculate this ...i supose is like this
  let ratingDescription =  ""
  if(rating < 1) ratingDescription = "You lack of motivation!"
  else if(rating < 2) ratingDescription = "Keep going, you'r doing well!"
  else ratingDescription = "Do you want to be a body builder?"
  


  const resp: IResume = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
  return resp

}


try{
  const {array, number} = parseArrayArgs(process.argv)
  const result = calculateExercises(array, number)
  console.log(result);
}
catch(error: unknown){
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
