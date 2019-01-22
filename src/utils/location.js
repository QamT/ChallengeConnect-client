import location from 'countrycitystatejson';

export default { 
  countries: location.getCountries().map(country => { return { name: country.name, shortName: country.shortName } }),
  getStates: location.getStatesByShort,
  getCities: location.getCities
}