import React, {useState, useEffect, useRef, useReducer} from 'react';
import {reducer} from './../functions/reducer.js';
import { useContext } from 'react';
import { getData } from '../functions/functions';

export const WorkoutContext = React.createContext();

const initialState = 
{
  sheetID: 0,
  workoutSheet: getData(0),
  notes: 'notes',
  type: 'weights',
  newChanges: false,
}


export const WorkoutContextProvider = ({children}) =>
{
  const [sheetID, setSheetID] = useState(0);
  const newExerciseRef = useRef(null);
  const notesRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);


  const updateNotes = (notes) =>
  {
    dispatch({type: 'update_notes', payload: {notes, notesRef}});
  }

  const changesToNotes = () =>
  {
    dispatch({type: 'changes_to_notes'});
  }

  const updateName = (name, id) =>
  {
    console.log('updating name');
    dispatch({type: 'update_name', payload: {name, id}});
  }

  const updateWorkoutSheet = (workoutSheet) =>
  {
    dispatch({type: 'update_workoutSheet', payload: {workoutSheet}});
  }

  const setWorkoutType = (type) =>
  {
    dispatch({type: 'set_workout_type', payload: {type}});
  }

  const newWorkoutSheet = (workoutSheet) =>
  {
    dispatch({type:'new_workout_sheet', payload: {workoutSheet}})
  }

  const changeWorkoutSheet = (workoutSheet, sheetID) =>
  {
    dispatch({type: 'change_workoutSheet', payload: {workoutSheet, sheetID}});
  }


  return (
    <WorkoutContext.Provider value={{sheetID, setSheetID, newExerciseRef,setWorkoutType,
      notesRef, state, updateNotes, changesToNotes, updateName, updateWorkoutSheet, newWorkoutSheet,
      changeWorkoutSheet}}>
      {children}
    </WorkoutContext.Provider>
  )
  
}


export const useWorkoutContext = () =>
{
  return useContext(WorkoutContext);
}