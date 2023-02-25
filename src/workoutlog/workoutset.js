import React, {useState} from 'react';
import { useWorkoutContext } from './context_workout';
import {SetInfo} from './setinfo';
import {SingleWeightSet} from './singleset/singleweightset';
import { SingleCardioSet } from './singleset/singlecardioset';


export function WorkoutSet(props)
{
  const [type, setType] = useState('weights');
  const exercises = JSON.parse(JSON.stringify(useWorkoutContext().state.workoutSheet.exercises));
  const exercise = exercises[props.id].info;
  const exerciseType = exercises[props.id].type;

  // Create the individual sets for each exercise
  const createSets = (sets, type) =>
  {
    let setList = [];
    let i = 0;
    
    // Check if we're creating weight set
    if(type === 'weights')
    {
      sets.forEach(set =>
      {
        setList.push(<SingleWeightSet num={i} reps={set.reps} weight={set.weight} key={i+1}/>)
        i++;
      });
    }

    else if(type === 'cardio')
    {
      sets.forEach(set =>
        {
          setList.push(<SingleCardioSet num={i} key={i+1} hrs={set.hrs} mins={set.mins} secs={set.secs} 
                                        dist={set.dist} unit={set.unit}/>);
          i++;
        });
    }

    return setList;
  }
  
  return (
    <article className="workout-set" data-id={props.id}>
      <SetInfo type={type} setType={setType} name={exercises[props.id].name} />

      <div className="set-center">   
        {createSets(exercise, exerciseType, exercises.name).map(item => item)}
      </div>
    </article>
  );
}