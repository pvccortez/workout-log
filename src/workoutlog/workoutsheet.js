import React from 'react';
import {NewExerciseModal} from './modals/newexercisemodal.js';
import {WeightsSetModal} from './modals/newsetmodal';
import {WorkoutSet} from './workoutset';
import { useWorkoutContext } from './context_workout.js';
import { getData } from '../functions/functions.js';



export function WorkoutSheet()
{

  const workoutSheet = useWorkoutContext().state.workoutSheet;
  // console.log(useWorkoutContext().state);
  const exercises = JSON.parse(JSON.stringify(useWorkoutContext().state.workoutSheet.exercises));

  if(!exercises)
  {
    return <div className="workout-sheet"></div>;
  }


  return (
    <div className="workout-sheet">
      <NewExerciseModal/>
      <WeightsSetModal/>

      {exercises.map((exercise, ctr=0) =>
      {
        return <WorkoutSet key={ctr} id={ctr++} exercise={exercise}/>;
      })}
    </div>
  )
}