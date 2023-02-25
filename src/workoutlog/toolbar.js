import React from 'react';
import { monthNames } from '../functions/data';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import {BsPlusCircle} from 'react-icons/bs';
import {FaFileAlt} from 'react-icons/fa'
import { getData, setData } from '../functions/functions';
import { useWorkoutContext } from './context_workout';



export function Toolbar(props)
{
  const globalVals = useWorkoutContext();
  const changeWorkoutSheet = globalVals.changeWorkoutSheet;
  const modalRef = globalVals.newExerciseRef;
  const notesRef =  globalVals.notesRef;

  let sheetID = getData('sheetID');
  let date = new Date(getData(sheetID).date);
  let title = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let isMorning = hours < 12? true: false;
  hours = ((hours + 11)%12) + 1;
  const time = `${hours}:${minutes > 9? minutes:`0:${minutes}`}${isMorning?'AM':'PM'}`; 

  
  const increment = () =>
  {
    let id = getData('sheetID');
    const numSheets = getData('numSheets');
    
    
    // Check if we're not at the end of the array
    if(id !== numSheets - 1)
    {
      id++;
    }

    // Set sheetID back to beginning of the array
    else
    {
      id = 0;
    }

    const workoutSheet = getData(id);
    const date = workoutSheet.date;
    
    setData('sheetDate', date);
    setData('sheetID', id);
    changeWorkoutSheet(getData(id), id);
  }

  const decrement = () =>
  {
    const numSheets = getData('numSheets');
    let id = getData('sheetID');


    // Check we're not at the beginning of the array
    if(sheetID !== 0)
    {
      id--;
    }

    // Set sheetID to the end of the array
    else
    {
      id = numSheets - 1;
    }

    const workoutSheet = getData(id);
    const date = workoutSheet.date;

    
    setData('sheetID', id);
    setData('sheetDate', date);
    changeWorkoutSheet(workoutSheet, id);

    // Update sheetID state and localStorage

  }


  const newExercise = () =>
  {
    modalRef.current.classList.add('display-modal');
    
    if(window.scroll({top: 0, left: 0, behavior: 'smooth'}))
    {
      console.log('scrolling to top of the page');
    }
  }


  const openNotes = () =>
  {
    notesRef.current.classList.add('display-notes-modal');
    notesRef.current.value = "test";

  }


  return(
    <section className="toolbar">
      <button className="edit-notes-btn" onClick={openNotes}>
        <FaFileAlt/>
        <span className='notes-span'>Notes</span>
      </button>

      <div className="toolbar-center">
        <button className="prev-btn date-btn" onClick={decrement}>
          <FaArrowLeft/>
        </button>

        <p className="date-container">
          {title}
          <span className='time-stamp-span'>{time}</span>
        </p>

        <button className="next-btn date-btn" onClick={increment}>
          <FaArrowRight/>
        </button>
      </div>

      <button className="new-workout-btn" onClick={newExercise}>
        <BsPlusCircle/>
        <span>Exercise</span>
      </button>
    </section>
  )
}

