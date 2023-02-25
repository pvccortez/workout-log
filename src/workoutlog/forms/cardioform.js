import React, {useState} from 'react';
import { UnitDropdown } from '../unitdropdown.js';
import {getData, setData, isValidMIN_SEC, isValidNumber, isValidHours, closeModal} from './../../functions/functions.js';
import { useWorkoutContext } from '../context_workout.js';


export const CardioForm = () =>
{
  const [exrName, setExrName] = useState('');
  const [exrHours, setExrHours] = useState('');
  const [exrMinutes, setExrMinutes] = useState('');
  const [exrSeconds, setExrSeconds] = useState('');
  const [exrUnit, setExrUnit] = useState('Select Unit');
  const [exrDist, setExrDist] = useState('');
  const [exrIntervals, setExrIntervals] = useState('');
  const globalVals = useWorkoutContext();
  const workoutSheet = JSON.parse(JSON.stringify(globalVals.state.workoutSheet));
  // const workoutSheet = globalVals.state.workoutSheet;
  const updateWorkoutSheet = globalVals.updateWorkoutSheet;
  const exercises = workoutSheet.exercises;


  // Finish after completing adding new exercise

  const parseData = (e) =>
  {
    e.preventDefault();

    const hrsError = isValidHours(exrHours, "Invalid Input for Hours");
    const minError = isValidMIN_SEC(exrMinutes, "Invalide Input for Minutes");
    const secError = isValidMIN_SEC(exrSeconds, "Invalide Input for Seconds");
    const distError = isValidNumber(exrDist, "Invalide Input for Distances");
    const intvError = isValidNumber(exrIntervals, "Invalid Input for Intervals");
    const setArray = [];
    const id = getData('sheetID');
    const date = (new Date(getData('date', id ))).toString();
    

    if(hrsError && minError && secError && distError && intvError)
    {
      for(let i = 0; i < exrIntervals; i++)
      {
        setArray.push({id: i, hrs: parseInt(exrHours) > 9? exrHours: `0${exrHours}`, mins: parseInt(exrMinutes) > 9? exrMinutes: `0${exrMinutes}`, 
                       secs: parseInt(exrSeconds) > 9? exrSeconds: `0${exrSeconds}`, dist: exrDist, unit: exrUnit,
                       });
      }

      const newArray = exercises.concat([{ name: exrName, id: exercises.length, 
                                              date: date, type: 'cardio', info: setArray, notes: ''}]);

      console.log(newArray);
  
      workoutSheet.exercises = newArray;                                      

      updateWorkoutSheet(workoutSheet);
    }

    else
    {
      return;
    }

    setExrName('');
    setExrHours('');
    setExrMinutes('');
    setExrSeconds('');
    setExrDist('');
    setExrIntervals('');

    closeModal('.new-exercise-modal');
  }


  return (
    <form action="" className='modal-form' onSubmit={(e) => parseData(e) }>
      <label htmlFor="exercise-name" className='modal-label'>Exercise Name</label>
      <input type="text" value={exrName} onChange={(e) => setExrName(e.target.value)}/>


      <label htmlFor="exercise-Time" className='modal-label'>Exercise Time</label>
      <div className="cardio-input-container">
        <input type="text" value={exrHours} onChange={(e) => setExrHours(e.target.value)} placeholder={'hrs(s)'}/>
        <input type="text" value={exrMinutes} onChange={(e) => setExrMinutes(e.target.value)} placeholder={'min(s)'} 
               pattern={'^[1-5]?[0-9]$'} title={'Enter a value: 0-59'}/>
        <input type="text" value={exrSeconds} onChange={(e) => setExrSeconds(e.target.value)} placeholder={'sec(s)'}
               pattern={'^[1-5]?[0-9]$'} title={'Enter a value: 0-59'}/>
      </div>

      <label htmlFor="exercise-Dist" className='modal-label'>Exercise Dist</label>
      <div className="cardio-distance-container">
        <input type="text" value={exrDist} onChange={(e) => setExrDist(e.target.value)}/>
        <UnitDropdown setExrUnit={setExrUnit} exrUnit={exrUnit} />
      </div>
      

      <label htmlFor="exercise-Intervals" className='modal-label'>Intervals</label>
      <input type="text" value={exrIntervals} onChange={(e) => setExrIntervals(e.target.value)}/>

      <span className="modal-error-span"></span>
      <button type='submit' className='modal-submit-btn'>Submit</button>
    </form>
  );
}