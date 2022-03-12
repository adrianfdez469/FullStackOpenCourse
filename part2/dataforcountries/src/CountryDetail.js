import React from 'react';
import Weather from './Weather';

const CountryDetail = ({country}) => {
  console.log(country);
  
  return (
    <>
      <h1>{country.name.common}</h1>
      {country.capital.map(cap => (<div key={cap}>{cap}</div>))}
      <div>area: {country.area}</div>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(lan => {
          return <li>{lan}</li> 
        })}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <Weather country={country}/>
    </>
  );

}
export default CountryDetail;