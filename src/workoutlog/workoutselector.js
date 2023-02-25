import React, {useState} from "react";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";


export function WorkoutSelector(props)
{
  const [openDiv, isOpenDiv] = useState(false);

  const selectType = (type) =>
  {
    props.setType(type);
    isOpenDiv(!openDiv);
  }

  return (
    <div className="selector-div">

        <button className={`${props.type}-set select-type-btn`} onClick={()=>isOpenDiv(!openDiv)}>
          {props.type} {openDiv?<AiFillCaretUp/>:<AiFillCaretDown/>}
        </button>

      {openDiv?<div className="workout-type">
                <button className="type-btn weights-set" onClick={()=> selectType('weights')}>Weights</button>
                <button className="type-btn cardio-set" onClick={()=> selectType('cardio')}>Cardio</button>
              </div>:<></>}
    </div>
  );
}