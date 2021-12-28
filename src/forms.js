/* eslint-disable no-unused-vars */
const generator = (() => {
  // create form needed for a search via city
  const citySearch = function() {
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', handleForm);
    const docFrag = new DocumentFragment();
    const city = document.createElement('input');
    city.required = true;
    attributeHelper(city, {"type":"text", "placeholder":"city", "name":"city"});
    const statecode = document.createElement('input');
    attributeHelper(statecode, {"type":"text", "placeholder":"state code", "name":"state"});
    const countrycode = document.createElement('input');
    attributeHelper(countrycode, {"type":"text", "placeholder":"country code", "name":"country"});
    let units = createMeasurementsQuery();
    const submitButton = document.createElement('input');
    attributeHelper(submitButton, {"id":"submitLocation", "type":"submit", "value":"Submit"});
    appendHelper(docFrag, [city, statecode, countrycode, units, submitButton]);
    form.appendChild(docFrag);
  };
  // create form needed for a search via zipcode
  const zipcodeSearch = function() {
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', handleForm);
    const docFrag = new DocumentFragment();
    const zipcode = document.createElement('input');
    zipcode.required = true;
    attributeHelper(zipcode, {"type":"text", "placeholder":"zipcode", "name":"zipcode"});
    const countrycode = document.createElement('input');
    countrycode.required = true;
    attributeHelper(countrycode, {"type":"text", "placeholder":"country code", "name":"country"});
    let units = createMeasurementsQuery();
    const submitButton = document.createElement('input');
    attributeHelper(submitButton, {"id":"submitLocation", "type":"submit", "value":"Submit"});
    appendHelper(docFrag, [zipcode, countrycode, units, submitButton]);
    form.appendChild(docFrag);
  };
  // create form needed for a search via coordinates
  const coordinatesSearch = function() {
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', handleForm);
    const docFrag = new DocumentFragment();
    const latitude = document.createElement('input');
    latitude.required = true;
    attributeHelper(latitude, {"type":"number", "placeholder":"latitude", "min":"-90", "max":"90","step":"0.01", "name":"latitude"});
    const longitude = document.createElement('input');
    longitude.required = true;
    attributeHelper(longitude, {"type":"number", "placeholder":"longitude", "min":"-180", "max":"180", "step":"0.01", "name":"longitude"});
    let units = createMeasurementsQuery();
    const submitButton = document.createElement('input');
    attributeHelper(submitButton, {"id":"submitLocation", "type":"submit", "value":"Submit"});
    appendHelper(docFrag, [latitude, longitude, units, submitButton]);
    form.appendChild(docFrag);
  };
  
  // concisely assign multiple attributes to an element(attr is an object)
  const attributeHelper = function(elem, attr) {
    for(let key in attr) {
      elem.setAttribute(key, attr[key]);
    };
  };
  
  // concisely append multiple children to an element(children is an array)
  const appendHelper = function(elem, children) {
    for(let i = 0; i < children.length; i++) {
      elem.appendChild(children[i]);
    };
  };

  // create the form option for deciding which system of measurements to use
  const createMeasurementsQuery = function() {
    const units = document.createElement('div');
    attributeHelper(units, {"id":"chooseUnits"});
    const unitsLabel = document.createElement('label');
    unitsLabel.textContent = 'Choose a measurement system:';
    attributeHelper(unitsLabel, {"for":"chooseUnits"});
    const imperial = document.createElement('input');
    imperial.checked = true;
    attributeHelper(imperial, {"type":"radio","id":"imperial", "name":"unit", "value":"imperial"});
    const imperialLabel = document.createElement('label');
    imperialLabel.textContent = 'Imperial';
    attributeHelper(imperialLabel, {"for":"imperial"});
    const metric = document.createElement('input');
    attributeHelper(metric, {"type":"radio", "id":"metric", "name":"unit", "value":"metric"});
    const metricLabel = document.createElement('label');
    metricLabel.textContent = 'Metric';
    attributeHelper(metricLabel, {"for":"metric"});
    appendHelper(units, [unitsLabel, imperial, imperialLabel, metric, metricLabel]);
    return units;
  };

  // handle form upon submission prevent refresh of page
  function handleForm(event) {
    event.preventDefault();
  };

  return {
    citySearch,
    zipcodeSearch,
    coordinatesSearch
  };
})();

export { generator };