// import React from 'react';
import { getCurrentWorkoutSheet, getData, setData, updateCurrentWorkoutSheet } from './functions';


export const reducer = (state, action) =>
{
  const payload = action.payload;
  
  switch(action.type)
  {
    case 'update_notes':
      action.payload.notesRef.current.classList.remove('display-notes-modal');

      const workoutSheet = getCurrentWorkoutSheet();
      workoutSheet.notes = action.payload.notes;
      updateCurrentWorkoutSheet(workoutSheet);

      const sheetID = getData('sheetID');

      return {...state, notes: action.payload.notes, newChanges: false};
    
    case 'changes_to_notes':
      return {...state, newChanges: true};


    case 'update_exercise':
      const workout_sheet = JSON.parse(JSON.stringify(state.workoutSheet));
      workout_sheet.exercises[payload.id].info = payload.exercise;

      return {...state, workoutSheet: workout_sheet};
    
    case 'update_name':
      const newExercise = state.exercises;
      newExercise[payload.id].name = payload.name;
      setData(getData('sheetID'), newExercise);
      
      return {...state, exercise: newExercise};

    case 'update_workoutSheet':
      // console.log(payload.workoutSheet);
      console.log('updating workoutSheet');
      setData(getData('sheetID'), payload.workoutSheet);
      return {...state, workoutSheet: payload.workoutSheet};

    case 'set_workout_type':
      return {...state, type: payload.type}; 

    case 'new_workout_sheet':
      console.log('creating new workout sheet');
      return {sheetID: payload.sheetID, workoutSheet: payload.workoutSheet, notes: '', 
              type: 'weights', newChanges: false}

    case 'change_workoutSheet':
      return {...state, workoutSheet: payload.workoutSheet, sheetID: payload.sheetID};

  }

  return state;
}