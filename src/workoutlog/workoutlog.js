import React from 'react'
import './../index.css'

import { WorkoutContextProvider } from './context_workout';
import { WorkoutSheet } from './workoutsheet';
import { Toolbar } from './toolbar'
import { NotesModal } from './modals/notesmodal';
import { useWorkoutContext } from './context_workout';


export function WorkoutLog(props)
{
  const data = useWorkoutContext();  

  return (
    <section className="workout-log">
      <Toolbar  sheetDate={props.sheetDate} />
      <WorkoutSheet />
      <NotesModal/>
    </section>
  )
}