/* eslint-disable no-unused-vars */

const createWeatherObjectImperial = function(weatherData) {
  let weather = {
    location : 'Location:' + ' ' + weatherData.name,
    conditions : 'Conditions:' + ' ' + weatherData.weather[0].main,
    current_temp : weatherData.main.temp + ' ' + 'Fahrenheit',
    windVelocity : 'Wind Velocity:' + ' ' + weatherData.wind.speed + ' ' + 'mph',
    units : 'imperial'
  };
  return weather;
};

const createWeatherObjectMetric = function(weatherData) {
  let weather = {
    location : 'Location:' + ' ' + weatherData.name,
    conditions : 'Conditions:' + ' ' + weatherData.weather[0].main,
    current_temp : weatherData.main.temp + ' ' + 'Celsius',
    windVelocity : 'Wind Velocity:' + ' ' + weatherData.wind.speed + ' ' + 'kph',
    units : 'metric'
  };
  return weather;
};

const getDisplayArea = function() {
  let elementsNodeList = document.querySelectorAll('div p');
  let elementsArray = Array.from(elementsNodeList);
  return elementsArray;

};

const displayWeather = async function(weatherObject, arrayOfElements) {
  // retrieve the gif
  const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=qcAi9vK7cptxqHIortntio79YvPBPHUI&s=' + weatherObject.conditions, {mode: 'cors'});
  const gifData = await response.json();
  const gifDataUrl = gifData.data.images.original.url;

  // display the weather data
  const weatherArray = Object.values(weatherObject);
  for(let i = 0; i< arrayOfElements.length; i++) {
    arrayOfElements[i].textContent += weatherArray[i];
  };

  // append the weather gif
  let image = document.createElement('img'); 
  image.src = gifDataUrl;
  let form = document.querySelector('#weatherDisplay');
  console.log(image);
  form.appendChild(image);
};

export {createWeatherObjectImperial, createWeatherObjectMetric, getDisplayArea, displayWeather};