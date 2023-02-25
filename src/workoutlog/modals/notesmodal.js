import React, {useState} from 'react';
import { useWorkoutContext} from '../context_workout';
import { getCurrentWorkoutSheet, updateCurrentWorkoutSheet, getFormattedDate } from '../../functions/functions';


export const NotesModal = () =>
{
  const context = useWorkoutContext();
  const notesRef = context.notesRef;
  const state = context.state;
  const updateNotes = context.updateNotes;
  const changesToNotes = context.changesToNotes;
  const workoutSheet = getCurrentWorkoutSheet();
  const [notes, setNotes] = useState(workoutSheet.notes);
  

  // Check to see if any changes were logged
  const newChanges = (e) =>
  {
    setNotes(e.target.value);
    changesToNotes();
  }

  // Update the notes based on the edits made.
  const editNotes = () =>
  {
    workoutSheet.notes = notes;
    updateCurrentWorkoutSheet(workoutSheet);
    updateNotes(notes)
  }

  // "Don't Save" button clicked, close the notes modal and check if any changes have
  // been made
  const closeNotes = () =>
  {
    // Check to see if any changes were made to text area
    if( state.newChanges === true)
    {
      // Prompt user to make sure they don't want to save changes, if "ok" pressed, 
      // the changes will not be added.
      if(window.confirm("Changes will not be saved") === true)
      {
        setNotes(getCurrentWorkoutSheet().notes);
        notesRef.current.classList.remove('display-notes-modal');
      }

      // Brings users back to notes modal.
      else
      {
        return;
      }
    }

    // Closes modal and leaves everything as-is, since no changes were logged.
    else
    {
      notesRef.current.classList.remove('display-notes-modal');
    } 
  }



  return (
    <section className="notes-modal " ref={notesRef}>
      <div className="notes-modal-center">
        <div className="notes-toolbar">
          <div className="notes-date"></div>
          <span>Notes</span>
        </div>

        <form action="" className='notes-form' onSubmit={e => {e.preventDefault(); console.log('submitting form');} }>
          <textarea name="notes" id="workout-notes"  className="notes-text-area" 
                    onChange={e => newChanges(e)} value={notes}>

          </textarea>

          <div className="notes-btn-container">
            <button type='button' className='notes-btn' onClick={() => closeNotes()}>Don't Save</button>
            <button type='submit' className='notes-btn save-notes-btn' onClick={() => editNotes()}>
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}