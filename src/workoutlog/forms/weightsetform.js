import React, {useState} from 'react';
import { useWorkoutContext } from '../context_workout';
import { setData } from '../../functions/functions';


export const WeightSetForm = () =>
{
  const [exrReps, setExrReps] = useState('');
  const [exrWeight, setExrWeight] = useState('');
  const [exrSets, setExrSets] = useState('');

  const globalVals = useWorkoutContext();
  const updateWorkoutSheet = globalVals.updateWorkoutSheet;
  const workoutSheet = JSON.parse(JSON.stringify(globalVals.state.workoutSheet));

  const isValidNumber = (num, message) =>
  {
    const errorSpan = document.querySelector('.modal-error-span');    

    if(isNaN(num) ||  num <  0 || num > 10000)
    {
      errorSpan.innerHTML = message;
      setTimeout(() => errorSpan.innerHTML = "",2000);

      return false;
    }

    return true;
  }

  const closeModal = () =>
  {
    const modal = document.querySelector('.new-set-modal');
    modal.classList.remove('display-modal');
  }

  const parseData = (e) =>
  {
    e.preventDefault();
    

    const id = e.target.parentElement.parentElement.dataset.id;    
    const repsError = isValidNumber(exrReps, "Invalid Number of Reps")
    const weightError = isValidNumber(exrWeight, "Invalid Weight");
    const setsError = isValidNumber(exrSets, "Invalid Number of Sets");

    if(repsError && weightError && setsError)
    {  
      for(let i = 0; i < exrSets; i++)
      {
        workoutSheet.exercises[id].info.push({id: workoutSheet.exercises[id].info.length , reps: parseInt(exrReps), 
                 weight: parseInt(exrWeight)});
      }

      updateWorkoutSheet(workoutSheet);
      
      setExrReps('');
      setExrWeight('');
      setExrSets('');
      closeModal();
    }
  }

  return (
    <form action="" className="weight-set-modal-form" onSubmit={parseData}>
      <label htmlFor="exercise-Reps" className='modal-label'>Reps</label>
      <input type="text" name='exrReps' id='exerciseReps' value={exrReps} required
      onChange={(e) => setExrReps(e.target.value)}/>

      <label htmlFor="exercise-Weight" className='modal-label'>Weight</label>
      <input type="text" name='exrWeight' id='exerciseWeight' value={exrWeight} required
      onChange={(e) => setExrWeight(e.target.value)}/>

      <label htmlFor="exercise-Sets" className='modal-label'>Sets</label>
      <input type="text" name='exrSets' id='exerciseSets' value={exrSets} required
      onChange={(e) => setExrSets(e.target.value)}/>

      <span className="modal-error-span"></span>
      <button type='submit' className='modal-submit-btn'>Submit</button>
    </form>
  )
}