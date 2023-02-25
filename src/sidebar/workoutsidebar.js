import React from 'react'
import {setData, getData, incrementSheetID} from '../functions/functions.js';
import { useWorkoutContext } from '../workoutlog/context_workout.js';

// React Icons
import {BsPlusCircle} from 'react-icons/bs';
import {BsTrash} from 'react-icons/bs';
import {SlMagnifier} from 'react-icons/sl'

export function WorkoutSideBar(props)
{
  const globalVals = useWorkoutContext();
  

  const newSheet = ()=>
  {
    const numSheets = getData('numSheets');
    const date = (new Date()).toString();
  
    const workoutSheet = {id: numSheets, date: date, notes: "Exercise Notes", 
                          exercises: [
                                        {name: 'New Sheet', id: 0, date: date, type:'weights', 
                                        info: [{id: 0, reps: 15, weight: 125}, 
                                                {id: 1, reps: 15, weight: 130}, 
                                                {id: 2, reps: 15, weight: 135}],
                                        }
                                      ]};

    setData('sheetID', numSheets);
    setData('numSheets', numSheets + 1);
    setData('sheetDate', date);
    setData(numSheets, workoutSheet);

    globalVals.newWorkoutSheet(workoutSheet, numSheets);
    const modalRef = globalVals.newExerciseRef;
    modalRef.current.classList.add('display-modal');
  }


  const findSheet = () =>
  {
    document.querySelector('.find-sheet-modal').classList.add('display-find-sheet-modal');
  }


  const deleteSheet = () =>
  {
    let sheetID = getData('sheetID');
    const numSheets = getData('numSheets');
    
    let workoutSheet;
    console.log('Deleting this sheet');

    if(!window.confirm("Delete Current Workout Sheet?"))
    {
      return;
    }

    // Case 1: Deleting non last sheet
    if( sheetID < numSheets - 1)
    {
       let itr = sheetID;
       let sheet;

       if(sheetID !== numSheets - 2)
       {
        // Iterate through local storage
        for(let i = itr + 1; i < numSheets; i++)
        {
          sheet = getData(i);
          setData(itr, sheet);
          itr++;
        }

         removeLastSheet(numSheets, sheetID);
       }

       else
       {
        sheet = getData(sheetID + 1);
        setData(sheetID, sheet);
        removeLastSheet(numSheets, sheetID);
       }
    }


    // Case 3: Last Element in local storage
    else if(sheetID === numSheets - 1)
    {
      console.log('Case 3: Deleting the last sheet');
      removeLastSheet(numSheets, sheetID - 1);
    }
  }


  const removeLastSheet = (numSheets, newSheetID) =>
  {
    const changeWorkoutSheet = globalVals.changeWorkoutSheet;

    localStorage.removeItem(numSheets - 1);
    setData('numSheets', numSheets - 1);
    setData('sheetID', newSheetID);

    const workoutSheet = getData(newSheetID);
    setData('sheetDate', workoutSheet.date);
    changeWorkoutSheet(workoutSheet, newSheetID);
  }

  return (
    <aside className="sidebar">
      <section className="sidebar-center">
        <ul className="sidebar-list">
          <button className="sidebar-btn" onClick={newSheet} >New Sheet <BsPlusCircle className='sidebar-plus-icon'/></button>
          <button className="sidebar-btn" onClick={findSheet}>Find Sheet <SlMagnifier className='sidebar-search-icon'/></button>
          <button className="sidebar-btn" onClick={deleteSheet}>Delete Sheet <BsTrash className='sidebar-delete-icon'/></button>
        </ul>
      </section>
    </aside>
  );
}