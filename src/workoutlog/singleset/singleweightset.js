import React from 'react';
import {useWorkoutContext} from '../context_workout.js';
import { setData, getData, getCurrentWorkoutSheet } from '../../functions/functions.js';
import {BsTrash} from 'react-icons/bs'


export const SingleWeightSet = (props) =>
{
  const globalVals = useWorkoutContext();
  const updateExercises = globalVals.updateExercises;
  const workoutSheet = globalVals.state.workoutSheet;
  const state_exercises = workoutSheet.exercises;


  const deleteSet = (e) =>
  {
    const exrID = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
    const singSetID = props.num;
    let j = 0;

    const newArray = state_exercises[exrID].info.filter(exercise =>
      {
        if(exercise.id !== singSetID)
        {
          exercise.id -= j;
          return exercise;
        }

        else
        {
          j = 1;
        }
      });

    updateExercises(newArray, exrID);
  }

  return (
    <div className="single-set">
      <span className="set-num"><span className="bold-span">Set:</span>  {props.num + 1}</span>
      <span className="set-reps"> <span className="bold-span">R:</span> {props.reps}</span>
      <span className="set-weight"><span className="bold-span">W:</span> {props.weight} <span className="light-grey-span">LBs</span> </span>
      <button className="delete-set-btn" onClick={deleteSet}>Delete<BsTrash/></button>
    </div>
  );
}