/* eslint-disable no-unused-vars */
import './main.css';
import { generator } from './forms.js';
import { listeners } from './event-listeners.js';


// add an event listener to the submit button for the radio options
listeners.radioSubmit();


// eslint-disable-next-line no-unused-vars

const retrieveWeather = async function(url) {
  try {
    let loading = document.createElement('h3');
    loading.textContent = 'LOADING...';
    loading.id = 'loading';
    let display = document.getElementById('weatherDisplay');
    display.appendChild(loading);
    const response = await fetch(url, {mode:'cors'});
    const weatherData = await response.json();
    loading.remove();
    return weatherData;
  }
  catch(err) {
    console.error(err);
  }
};

export { retrieveWeather };
