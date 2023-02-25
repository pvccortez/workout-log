import './App.css';
import {useState, useReducer, useEffect} from 'react';

import {Navbar} from './navbar/navbar.js';
import {WorkoutSideBar} from './sidebar/workoutsidebar.js';
import {FindSheetModal} from './findsheetmodal.js';
import {WorkoutLog} from './workoutlog/workoutlog.js';
import { useWorkoutContext, WorkoutContextProvider} from './workoutlog/context_workout';

// Products
import {ProductsPage} from './productspage/productspage.js';
import {ProductsSidebar} from './sidebar/productssidebar.js';

// var docWidth = document.documentElement.offsetWidth;

// [].forEach.call(
//   document.querySelectorAll('*'),
//   function(el) {
//     if (el.offsetWidth > docWidth) 
//     {
//       console.log();
//       console.log(el);
//     }
//   }
// );





function App() 
{
  const [productType, setProductType] = useState('All');
  const globalVals = useWorkoutContext();

  const init = () =>
  {
    return (
      <>
        <FindSheetModal/>
        <WorkoutSideBar/>
        <WorkoutLog />
      </>) 
    ;
  }

    // Reducer function that will determine which componenet to render
  function reducer(state, action)
  {
    switch(action.type)
    {
      case 'workout':
        return (
          <>
            <WorkoutContextProvider>
              <FindSheetModal/>
              <WorkoutSideBar/>
              <WorkoutLog/>
            </WorkoutContextProvider>
          </>
        );

      case 'products':
        return (
          <>
            <ProductsPage productType={productType}/>
            <ProductsSidebar setProductType={setProductType}/>
          </>
        );

      default:
        return <></>;
    }
  }

  const [state, setState] = useReducer(reducer, init(), () => init());

  useEffect(() => 
  {
    setState({type: 'workout'})
  },[productType]);
  
  
  return (
    <main  className="App">
      <Navbar state={state} setState={setState}/>
      {state}
    </main >
  );
}

export default App;
