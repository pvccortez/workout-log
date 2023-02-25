import React, {useState} from 'react';
import { useWorkoutContext } from '../context_workout.js';
import {FaTimes} from 'react-icons/fa';
import { WorkoutSelector } from '../workoutselector.js';
import {WeightsForm} from './../forms/weightsform';
import {CardioForm } from './../forms/cardioform.js';

export const NewExerciseModal = () =>
{
  const [type, setType] = useState('weights')
  const newExerciseRef = useWorkoutContext().newExerciseRef;

  const closeModal = () =>
  {
    newExerciseRef.current.classList.remove('display-modal')
  }
  

  return (
    <section className="new-exercise-modal display-modal" ref={newExerciseRef}>
      <div className="modal-center">

        <h2 className='modal-header'><WorkoutSelector setType={setType} type={type}/> </h2>

        <button className='close-modal-btn' onClick={closeModal}><FaTimes  className='icon'/></button>
        
        {type === 'weights'? <WeightsForm/>: 
                             <CardioForm/>}
        
      </div>
    </section>
  )
}