import React from 'react';
import CountryList from './CountryList';
import CountryDetail from './CountryDetail';

const CountriesBody = ({countries, onClickCountry}) => {

  

  if (countries.length > 10) {
    return <>Too many matches, specify another filter</>
  }
  if (countries.length === 1){
    return <CountryDetail country={countries[0]} />
  }
  
  return <CountryList countries={countries} onShowCountryView={onClickCountry} />;

}
export default CountriesBody;