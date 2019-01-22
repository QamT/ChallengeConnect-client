import React from 'react';
import { object, func } from 'prop-types';
import Select from 'react-select';

import LHandler from '../../utils/location';

const LocationPicker = ({ location, setlocation }) => {
  const { country, state, city } = location;
  const changeFormat = (value, extra) => ({
    value: extra || value,
    label: value
  });

  const countries = LHandler.countries.map(country => { return changeFormat(country.shortName) });
  const states = country ? 
    LHandler.getStates(country).map(state => { return changeFormat(state) }) : [];
  const cities = state ? 
    LHandler.getCities(country, state).map(city => { return changeFormat(city) }) : [];
  
  return (
    <>
      <Select 
        onChange={value => setlocation('country', value.value)}
        className='react-select-container'
        classNamePrefix='react-select'
        options={countries} 
        placeholder={country || 'Country'}
      />
      <Select 
        onChange={value => setlocation('state', value.value)}
        className='react-select-container'
        classNamePrefix='react-select'
        options={states} 
        isDisabled={states.length === 0 || states[0].value === 'Other Provinces'}
        placeholder={state || 'State'} 
      />
      <Select 
        onChange={value => setlocation('city', value.value)}
        className='react-select-container'
        classNamePrefix='react-select'
        options={cities} 
        isDisabled={cities.length === 0}
        placeholder={city || 'City'} 
      />
    </>
  )
}

LocationPicker.propTypes = {
  location: object.isRequired,
  setlocation: func.isRequired
}

export default LocationPicker;
