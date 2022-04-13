export interface IBmiParms {
  height: number,
  weight: number
}

const parseTwoArgs = (args: Array<string>): IBmiParms => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const param1 = Number(args[2])
  const param2 = Number(args[3])

  if(!isNaN(param1) && !isNaN(param2)){
    return {
      height: param1,
      weight: param2
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const convertToMeters = (x: number):number => {
  return x / 100
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(convertToMeters(height), 2)
  
  if(bmi < 18.5) {
    return "Underweight" 
  } else if (bmi < 24.9) {
    return "Normal (healthy weight)"
  } else if(bmi < 29.9) {
    return "Overweight"
  } else {
    return "Obese"
  }
}




try{  
  const { height, weight } = parseTwoArgs(process.argv);
  const bmi = calculateBmi(height, weight)
  console.log(bmi)
} catch(error: unknown){
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}