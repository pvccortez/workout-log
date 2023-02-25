
import { monthNames } from "./data";

export const setData = (name, input) =>
{
  localStorage.setItem(name, JSON.stringify(input));
}

export const getData = (name) =>
{
  const item = localStorage.getItem(name);
  
  if(!item)
  {
    return false;
  }

  return JSON.parse(item); 
}

export const getCurrentWorkoutSheet = () =>
{
  return getData(getData('sheetID'));
}

export const updateCurrentWorkoutSheet = (workoutSheet) =>
{
  setData(getData('sheetID'), workoutSheet);
  console.log(workoutSheet);
}

export const incrementSheetID = () =>
{
  const numSheets = parseInt(getData('numSheets')) + 1;
  const sheetID = parseInt(getData('sheetID')) + 1;

  console.log('numSheets: ', numSheets);
  console.log('sheetID: ', sheetID);
  setData('sheetID', sheetID);
  setData('numSheets', numSheets);
}

export const decrementSheetID = () =>
{
  const numSheets = getData('numSheets');

  setData('SheetID', numSheets - 1);
  setData('numSheets', numSheets - 1);
}

export const getFormattedDate = (dateStr) =>
{
  const date = new Date(dateStr);
  const minutes = date.getMinutes() > 9? date.getMinutes(): `0${date.getMinutes()}`;
  const title = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const time = `${((date.getHours() + 11)%12) + 1}:${minutes} ${date.getHours()<12?'AM':'PM'}`;

  return `${title}, ${time}`
}

export const isValidNumber = (num, message) =>
{
  const errorSpan = document.querySelector('.modal-error-span');    

  if(isNaN(num) ||  num <  0 || num > 1000)
  {
    errorSpan.innerHTML = message;
    setTimeout(() => errorSpan.innerHTML = "",2000);

    return false;
  }

  return true;
}

export const isValidHours = (num, message) =>
{
  const errorSpan = document.querySelector('.modal-error-span');

  if(isNaN(num) ||  num <  0 || num > 100)
  {
    errorSpan.innerHTML = message;
    setTimeout(() => errorSpan.innerHTML = "",2000);

    return false;
  }

  return true;
}

export const isValidMIN_SEC = (num, message) =>
{
  const errorSpan = document.querySelector('.modal-error-span');
  
  if(isNaN(num) ||  num <  0 || num > 60)
  {
    errorSpan.innerHTML = message;
    setTimeout(() => errorSpan.innerHTML = "",2000);

    return false;
  }

  return true;
}

export const closeModal = (modal) =>
{
  document.querySelector(modal).classList.remove('display-modal')
}

export const getLength = (array) =>
{
  let ctr = 0;

  array.forEach(item =>
    {
      ctr++;
    })

  return ctr;
}