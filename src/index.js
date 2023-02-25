import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getData, setData} from './functions/functions.js';
import { WorkoutContextProvider } from './workoutlog/context_workout';

const hasData = getData(0);
const sheetID = getData('sheetID');
let sheetDate = getData('sheetDate');


if(!sheetID)
{
  setData('sheetID', 0);
  setData('numSheets', 1);
}

if(!sheetDate)
{
  sheetDate = new Date()
  setData('sheetDate', sheetDate.toString());
}

if(!hasData)
{
  setData(0, {id: 0, date: sheetDate.toString(), notes: "Exercise Notes", 
                   exercises: [
                              {name: 'curls', id: 0, date: sheetDate.toString(), type:'weights', 
                               info: [{id: 0, reps: 15, weight: 35}, 
                                      {id: 1, reps: 15, weight: 40}, 
                                      {id: 2, reps: 15, weight: 45}],
                              }
                            ]}
          );
}


// const newFormat = {id: 0, date: sheetDate.toString(), notes: "Exercise Notes", 
//                    exercies: [
//                               {name: 'curls', id: 0, date: sheetDate.toString(), type:'weights', 
//                                info: [{id: 1, reps: 15, weight: 35}, 
//                                       {id: 2, reps: 15, weight: 40}, 
//                                       {id: 3, reps: 15, weight: 45}],
//                                notes: "Exercise Notes",
//                               }
//                             ]}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
