import express, {Request, Response} from 'express'
import { IBmiParms, calculateBmi } from './bmiCalculator'
import { calculateExercises, IResume } from './exerciseCalculator'

interface IResp extends IBmiParms {
  bmi: string
}
interface IRespError {
  error: string
}

const app = express()

app.use(express.json())

app.get('/', (_req, resp) => {
  resp.send('Hello Full Stack!')
})


app.get('/bmi', (req: Request<unknown, unknown, unknown, IBmiParms>, resp: Response<IResp | IRespError>) => {
  const { height, weight } = req.query
  if(isNaN(Number(height)) || isNaN(Number(weight)) || !height || !weight ){
    return resp.status(400).json({error: "Malformatted parameters"})
  }

  const bmi = calculateBmi(height, weight)
  return resp.status(200).json({
    bmi,
    height,
    weight
  })
  
})

app.post('/exercises', (req: Request<unknown, unknown, {daily_exercises: number[], target: number}, unknown>, resp: Response<IResume | IRespError>) => {
    const { daily_exercises, target } = req.body
    
    if(!daily_exercises || !target){
      return resp.status(400).json({error: "Parameter s missing"})
    }
    if(daily_exercises.every((n) => !isNaN(Number(n))) && !isNaN(target)){
      const ex = daily_exercises.map((x) => Number(x))
      
      const data = calculateExercises(ex, target)
      return resp.status(200).json(data)
    } else{
      return resp.status(400).json({error: "Malformatted parameters"})
    }
  })

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
  
})