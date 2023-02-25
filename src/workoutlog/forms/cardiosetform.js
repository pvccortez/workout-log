import React, {useState} from 'react';
import { UnitDropdown } from '../unitdropdown';
import { useWorkoutContext } from '../context_workout';
import { isValidHours, isValidMIN_SEC, isValidNumber, getData, getLength } from '../../functions/functions';

export const CardioSetForm = () =>
{
  const [exrHours, setExrHours] = useState('');
  const [exrMinutes, setExrMinutes] = useState('');
  const [exrSeconds, setExrSeconds] = useState('');
  const [exrUnit, setExrUnit] = useState('Select Unit');
  const [exrDist, setExrDist] = useState('');
  const [exrIntervals, setExrIntervals] = useState('');
  const globalVals = useWorkoutContext();
  const updateWorkoutSheet = globalVals.updateWorkoutSheet;
  const workoutSheet = JSON.parse(JSON.stringify(globalVals.state.workoutSheet));
  const exercises = workoutSheet.exercises;



  const closeModal = () =>
  {
    const modal = document.querySelector('.new-set-modal');
    modal.classList.remove('display-modal');
  }

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
    const exrID = exercises.length;
    

    if(hrsError && minError && secError && distError && intvError)
    {
      
      const exrID = exercises.length - 1;
      let setID_Start = ((workoutSheet.exercises[exrID]).info).lenght;
      let ctr = getLength(exercises[exrID].info);
      

      for(let i = 0; i < exrIntervals; i++)
      {
        console.log(ctr);
        console.log((exercises[exrID].info).length);
        setArray.push({id: ctr, hrs: exrHours, mins: parseInt(exrMinutes) < 9? `0${exrMinutes}`: exrMinutes, 
                       secs: parseInt(exrSeconds) < 9? `0${exrSeconds}`: exrSeconds, dist: exrDist, unit: exrUnit,
                       });
        setID_Start++;
        ctr += 1;
      }

      let newArray = exercises[exrID].info;
      
      newArray = newArray.concat(setArray);
      workoutSheet.exercises[exrID].info = newArray;

      console.log(workoutSheet);
  
      updateWorkoutSheet(workoutSheet);
    }

    else
    {
      return;
    }

    setExrHours('');
    setExrMinutes('');
    setExrSeconds('');
    setExrDist('');
    setExrIntervals('');

    closeModal('.new-exercise-modal');
  }


  return (
    <form action="" className='modal-form' onSubmit={(e) => parseData(e) }>
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
  )
}