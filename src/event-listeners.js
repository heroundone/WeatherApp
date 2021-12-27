/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { generator } from "./forms";
import { retrieveWeather  } from "./main";
import { createWeatherObject, getDisplayArea, displayWeather } from "./display-weather";

const listeners = (() => {
  const radioSubmit = function() {
    const button = document.getElementById('submitOption');
    button.addEventListener('click', () => {
      let radios = document.querySelectorAll('input[type="radio"');
      let option = selectedRadio(radios);
      if(!option) {
        return;
      }
      // clear form if one is currently generated, then decide which form to generate
      clearForm('#searchForm');
      if (option.id === 'searchOption1') {
        generator.citySearch();
        submitCity();
      }
      else if (option.id === 'searchOption2') {
        generator.zipcodeSearch();
        submitZipcode();
      }
      else {
        generator.coordinatesSearch();
        submitCoordinates();
      };
    });
  };
  
  //three different event listener functions for each of the search methods
  const submitCity = function () {
    let button = document.querySelector('#submitLocation');
    button.addEventListener('click', () => {
      // check to see if a search has already been made
      checkDisplay();

      // obtain all children of form element
      let inputs = getFormChildren();

      // filter inputs that were left blank and get an array of their values
      const inputsToUse = inputs.filter((input) => input.value !== '');
      const inputValues = inputsToUse.map(input => input.value);
      const searchTerms = inputValues.join();
      
      // make the request for weather data now
      async function  weather() {
        let weatherData = await requestWeatherCity(searchTerms);
        console.log(weatherData);
        let forecast = createWeatherObject(weatherData);
        let display = getDisplayArea();
        displayWeather(forecast, display,);
      }
      weather();
      

    });
  };

  const submitZipcode = function () {
    // don't need to filter for  empty inputs as they are all required
    let button = document.querySelector('#submitLocation');
    button.addEventListener('click', () => {
      // check to see if a search has already been made
      checkDisplay();

      // obtain all children of form element
      let inputs = getFormChildren();

      // get an array of their values
      const inputValues = inputs.map(input => input.value);
      const searchTerms = inputValues.join();

      // make the request for weather data now
      async function  weather() {
        let weatherData = await requestWeatherZipcode(searchTerms);
        console.log(weatherData);
        let forecast = createWeatherObject(weatherData);
        let display = getDisplayArea();
        displayWeather(forecast, display,);
      }
      weather();
    });
  };

  const submitCoordinates = function () {
    // don't need to filter for empty inputs as they are all required
    let button = document.querySelector('#submitLocation');
    button.addEventListener('click', () => {
      // check to see if a search has already been made
      checkDisplay();

      // obtain all children of form element
      let inputs = getFormChildren();

      // get an array of their values
      const searchTerms = inputs.map(input => (input.value));

      // make the request for weather data now
      async function  weather() {
        let weatherData = await requestWeatherCoordinates(searchTerms);
        console.log(weatherData);
        let forecast = createWeatherObject(weatherData);
        let display = getDisplayArea();
        displayWeather(forecast, display,);
      }
      weather();
      
    });
  };
  

  // helper used to find which radio button is clicked
  const selectedRadio = (radios) => {
    try{
      for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
          return radios[i];
        }
      }
      throw('A search method has not been selected');
    }
    catch(error) {
      console.error(error);
    }
  };

  // helper for clearing a form(pass in a valid query selector value)
  const clearForm = function (query) {
    let form = document.querySelector(`${query}`);
    while(form.firstElementChild) {
      form.removeChild(form.firstElementChild);
    }
  };

  // helper for checking if a weather search has been made
  const checkDisplay = function() {
    let display = document.getElementById('weatherDisplay');
    if(display.firstElementChild.textContent !== '') {
      display.removeChild(display.lastElementChild);
      let children = [];
      let child = display.firstElementChild;
      while(child) {
        children.push(child);
        child = child.nextElementSibling;
      }
      children.forEach(child => child.textContent = '');
    }
  };

  // helper for getting the inputs associated with a form
  function getFormChildren() {
    let form = document.getElementById('searchForm');
    let children = [];
    let child = form.firstElementChild;
    while(child.nextElementSibling) {
      children.push(child);
      child = child.nextElementSibling;
    }
    return children;
  };

  // helper for retrieving weather data via city method
  const requestWeatherCity = async function(searchTerms) {
    let urlPart1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
    let urlPart2 = searchTerms;
    let urlPart3 = '&appid=b4f7d6acd212f77315d51bd20d5957f6&units=imperial';
    let url = urlPart1 + urlPart2 + urlPart3;
    console.log(url);
    let data =  await retrieveWeather(url);
    console.log(data);
    return data;
    
  };

  const requestWeatherZipcode = async function(searchTerms) {
    let urlPart1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    let urlPart2 = searchTerms;
    let urlPart3 = '&appid=b4f7d6acd212f77315d51bd20d5957f6&units=imperial';
    let url = urlPart1 + urlPart2 + urlPart3;
    console.log(url);
    let data =  await retrieveWeather(url);
    console.log(data);
    return data;
  };
    
  const requestWeatherCoordinates = async function(searchTerms) {
    console.log(searchTerms);
    let urlPart1 = 'http://api.openweathermap.org/data/2.5/weather?';
    let urlPart2 = `lat=${searchTerms[0]}&lon=${searchTerms[1]}`;
    let urlPart3 = '&appid=b4f7d6acd212f77315d51bd20d5957f6&units=imperial';
    let url = urlPart1 + urlPart2 + urlPart3;
    console.log(url);
    let data =  await retrieveWeather(url);
    console.log(data);
    return data;
  };



  return {
    radioSubmit,
  };
})();

export { listeners };