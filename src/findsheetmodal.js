import React from 'react';
import { useWorkoutContext } from './workoutlog/context_workout';
import { getData, setData } from './functions/functions';
import { getFormattedDate } from './functions/functions';
import {FaTimes} from 'react-icons/fa';


export const FindSheetModal = () =>
{
  const globalVals = useWorkoutContext();
  
  const closeModal = () =>
  {
    const modal = document.querySelector('.find-sheet-modal');  
    modal.classList.remove('display-find-sheet-modal');
  }

  const changeSheets = (e) =>
  {
    const id = parseInt(e.currentTarget.dataset.id);
    const workoutSheet = getData(id);

    setData('sheetID', id)
    setData('sheetDate', workoutSheet.date);
    globalVals.changeWorkoutSheet(workoutSheet, id);

    document.querySelector('.find-sheet-modal').classList.remove('display-find-sheet-modal'); 
  }

  const ListWorkoutSheets = () =>
  {
    const numSheets = getData('numSheets');
    const sheetsList = [];

    // Iterate through local storage
    for(let i = 0; i < numSheets; i++)
    {
      sheetsList.push({id: i, date: getData(i).date});
    }
   
    return (
      sheetsList.map(sheet =>
        {
          return <li className="find-sheet-option" key={sheet.id}>
                  <p>{sheet.id + 1}: <span>{getFormattedDate(sheet.date)}</span></p>
                  <button className='find-sheet-btn' data-id={sheet.id} onClick={changeSheets}>Select</button>
                 </li>
        })
    );
  }

  return (
    <section className="find-sheet-modal">
      <div className="find-sheet-modal-center">
        <button className='close-modal-btn' onClick={closeModal}><FaTimes  className='icon'/></button>

        <div className="find-sheet-modal-container">
          <h3 className="find-sheet-header">Find Workout Sheet</h3>
          <ul className="find-sheets-list">
            {ListWorkoutSheets()}
          </ul>
        </div>
        
      </div>
    </section>
  );
}