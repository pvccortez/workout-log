import React, {useState} from "react";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";


export function UnitDropdown(props)
{
  const [openDiv, isOpenDiv] = useState(false);

  const toggleBtn = (e) =>
  {
    e.preventDefault();
    isOpenDiv(!openDiv);
  }
  
  const selectUnit = (type) =>
  {
    props.setExrUnit(type);
    isOpenDiv(!openDiv);
  }

  return (
    <div className="selector-div">

        <button className='unit-dropdown' onClick={(e)=> toggleBtn(e)}>
          {props.exrUnit}
          {props.type} {openDiv?<AiFillCaretUp/>:<AiFillCaretDown/>}
        </button>

      {openDiv?<div className="unit-type-container">
                <button className="type-btn" onClick={()=> selectUnit('mi')}>Mile(s)</button>
                <button className="type-btn" onClick={()=> selectUnit('m')}>Meter(s)</button>
                <button className="type-btn" onClick={()=> selectUnit('km')}>Kilometer(s)</button>
                <button className="type-btn" onClick={()=> selectUnit('yd')}>Yard(s)</button>
              </div>:<></>}
    </div>
  );
}