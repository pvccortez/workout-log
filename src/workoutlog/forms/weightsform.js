import React, {useState} from 'react';
import { getData, setData, isValidNumber, closeModal} from './../../functions/functions.js';
import { useWorkoutContext } from '../context_workout.js';



export const WeightsForm = () =>
{
  const [exrName, setExrName] = useState('');
  const [exrReps, setExrReps] = useState('');
  const [exrWeight, setExrWeight] = useState('');
  const [exrSets, setExrSets] = useState('');
  const  globalVals = useWorkoutContext();
  const workoutSheet = globalVals.state.workoutSheet;
  const updateWorkoutSheet = globalVals.updateWorkoutSheet;
  
  const parseData = (e) =>
  {
    e.preventDefault();
    console.log('Adding a new exercise');
    
    // Check if the user input valid values
    const repsError = isValidNumber(exrReps, "Invalid Number of Reps")
    const weightError = isValidNumber(exrWeight, "Invalid Weight");
    const setsError = isValidNumber(exrSets, "Invalid Number of Sets");
    const date = new Date(getData('sheetDate')).toString();    

    // Check that there was no bad data
    if(repsError && weightError && setsError)
    {
      const newSetArr = [];
      const id = workoutSheet.exercises.length;
      const newSheet = workoutSheet;

      // Add the number of sets
      for(let i = 0; i < exrSets; i++)
      {
        newSetArr.push({id: i, reps: exrReps, weight: exrWeight});
      }

      newSheet.exercises = workoutSheet.exercises.concat(
        [
          {name: exrName, id: id, date: date, type: 'weights',
          info: newSetArr, notes: ''}
        ]);

      updateWorkoutSheet(newSheet, id);
      closeModal('.new-exercise-modal');
    }

    else
    {
      return;
    }



    // Reset the form input values
    setExrName('');
    setExrReps('');
    setExrWeight('');
    setExrSets('');
  }


  return (
    <form action="" className="modal-form" onSubmit={parseData}>
      <label htmlFor="exercise-name" className='modal-label'>Exercise Name</label>
      <input type="text" name='exrName' id='exerciseName' value={exrName} required
      onChange={(e) => setExrName(e.target.value)}/>

      <label htmlFor="exercise-Reps" className='modal-label'>Reps</label>
      <input type="text" name='exrReps' id='exerciseReps' value={exrReps} required
      onChange={(e) => setExrReps(e.target.value)}/>

      <label htmlFor="exercise-Weight" className='modal-label'>Weight</label>
      <input type="text" name='exrWeight' id='exerciseWeight' value={exrWeight} required
      onChange={(e) => setExrWeight(e.target.value)}/>

      <label htmlFor="exercise-Sets" className='modal-label'>Number of Sets</label>
      <input type="text" name='exrSets' id='exerciseSets' value={exrSets} required
      onChange={(e) => setExrSets(e.target.value)}/>

      <span className="modal-error-span"></span>
      <button type='submit' className='modal-submit-btn'>Submit</button>
    </form>
  );
}