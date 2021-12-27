/* eslint-disable no-unused-vars */
import './main.css';
import { generator } from './forms.js';
import { listeners } from './event-listeners.js';


// add an event listener to the submit button for the radio options
listeners.radioSubmit();


// eslint-disable-next-line no-unused-vars

const retrieveWeather = async function(url) {
  try {
    const response = await fetch(url, {mode:'cors'});
    const weatherData = await response.json();
    return weatherData;
  }
  catch(err) {
    console.error(err);
  }
};

export { retrieveWeather };
