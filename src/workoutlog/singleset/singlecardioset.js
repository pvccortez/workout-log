import React from 'react'
import { useWorkoutContext } from '../context_workout'
import {BsTrash} from 'react-icons/bs'

export const SingleCardioSet = (props) =>
{
  const globalVals = useWorkoutContext();
  let updateWorkoutSheet = globalVals.updateWorkoutSheet;
  let workoutSheet = globalVals.state.workoutSheet;
  let exercises = JSON.parse(JSON.stringify(workoutSheet.exercises));

  const deleteSet = (e) =>
  {
    const singleSetID = props.num;
    const exrID = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
    let j = 0;

    console.log(singleSetID);

    const newArray = exercises[exrID].info.filter(set =>
      {
        if(set.id != singleSetID)
        {
          set.id -= j;
          return set;
        }

        else
        {
          j = 1;
        }
      });

    // console.log(singleSetID);

    // workoutSheet.exercises[exrID].info = newArray;
    const newSheet = JSON.parse(JSON.stringify(workoutSheet));
   newSheet.exercises[exrID].info = newArray;
    // console.log(workoutSheet.exercises[exrID].info);
    // console.log(newSheet.exercises[exrID].info)
    updateWorkoutSheet(newSheet);
  }

  return (
    <div className="single-set">
      <span className='interval-num'><span className="bold-span">Intr: </span>{props.num + 1}</span>

      <span className="cardio-time">
        <span className="bold-span">T: </span>
         {props.hrs}:{props.mins}:{props.secs} 
        </span>

        <span>
          <span className="bold-span">D: </span> 
          {props.dist} 
          <span className="light-grey-span"> {props.unit}</span>
      </span>

      <button className="delete-set-btn" onClick={deleteSet}>Delete <BsTrash/> </button>
    </div>
  );
}