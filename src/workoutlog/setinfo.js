import React, {useState} from "react";
import {setData, incrementSheetID} from "./../functions/functions.js";
import { useWorkoutContext } from "./context_workout.js";
import {BsPlusCircle} from 'react-icons/bs';
import {BsTrash} from 'react-icons/bs';
import {CiEdit} from 'react-icons/ci';
import { useEffect } from "react";



export function SetInfo(props)
{
  const [editTitle, isEditingTitle] = useState(false);
  const [title, setTitle] = useState();
  const globalVals = useWorkoutContext();
  const setType = globalVals.setWorkoutType;
  const workoutSheet = globalVals.state.workoutSheet;
  const exercises = workoutSheet.exercises;
  const updateName = globalVals.updateName;
  const updateWorkoutSheet = globalVals.updateWorkoutSheet;

  useEffect(()=>{setTitle(props.name)}, [props.name]);


  // This will open the modal to allow user to create a new set for the current exercise
  const openModal = (e) =>
  {
    const id = (e.currentTarget.parentElement.parentElement.parentElement.dataset.id);
    const type = exercises[id].type;
    setType(type);


    const modal = document.querySelector('.new-set-modal');
    modal.dataset.id = id;
    modal.classList.add('display-modal');


    // Updating the modal's dataset id is important for the modal component to use
    // for it's functions when it adds a ne set an updates the exercise array.
    modal.dataset.id = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
     if(window.scroll({top: 0, left: 0, behavior: 'smooth'}))
    {
      console.log('scrolling to top of the page');
    }
  }

  const deleteExercise = (e) =>
  {
    // Get Set id
    const exrID = parseInt(e.currentTarget.parentElement.parentElement.dataset.id);
    let j = 0;

    // Filter out the exercise to be deleted
    const newArray = exercises.filter(exercise =>
      {
        if(exercise.id !== exrID)
        {
          exercise.id -= j;
          return exercise; // return the exercises that don't match the id
        }

        // We need to decrement the id's of the exercies to the left of the one 
        // to be deleted
        else
        {
          j = 1;
        }
      });


      workoutSheet.exercises = newArray;
      updateWorkoutSheet(workoutSheet);

    // Update the "exercises" state and update data in local storage
    // setData(globalVals.sheetID, newArray);
    //  incrementSheetID();
  }

  const editExercise = (e) =>
  {
    e.preventDefault();

    const id = e.currentTarget.parentElement.parentElement.dataset.id;
    let newWorkoutSheet = workoutSheet;
    
    newWorkoutSheet.exercises[id].name = title;
    updateWorkoutSheet(newWorkoutSheet);
    isEditingTitle(false);
  }

  return (
    <div className="set-info">
      <button className="delete-exercise-btn" onClick={deleteExercise}>
        <BsTrash className="delete-exercise-icon"/>
      </button>

      {!editTitle?<span className="set-title">{title}</span>:<form className="edit-title-form" onSubmit={(e) => editExercise(e)}>
                                                          <input typy='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                                          <button className="edit-title-btn">Edit</button>
                                                        </form>}

      <div className="set-btn-container">
        <button className="edit-exercise-btn" onClick={(e) => isEditingTitle(!editTitle)}>
          <CiEdit className="edit-exercise-icon"/>
        </button>
        <button className="new-set-btn" onClick={openModal}>
          <BsPlusCircle className='plus-circle-icon'/>
        </button>
      </div>
    </div>
  );
}