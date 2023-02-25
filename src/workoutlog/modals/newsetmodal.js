import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { WeightSetForm } from '../forms/weightsetform.js';
import { CardioSetForm } from './../forms/cardiosetform'
import { useWorkoutContext } from '../context_workout.js';

export const WeightsSetModal = () =>
{
  const type = useWorkoutContext().state.type;
  // Need to finish adding new set data when user inputs data into set modal

  const closeModal = () =>
  {
    const modal = document.querySelector('.new-set-modal');
    modal.classList.remove('display-modal');
  }

  return (
    <section className="new-set-modal" data-id={0}>
      <div className="set-modal-center">
        <h2 className='modal-header'>{type}</h2>

        <button className='close-modal-btn' onClick={closeModal}><FaTimes  className='icon'/></button>
        
        {type === 'weights'? <WeightSetForm/>: <CardioSetForm/>}
        
      </div>
    </section>
  )
}