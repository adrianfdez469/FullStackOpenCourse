import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import CountriesBody from './CountriesBody';

const API_COUNTRIES_ALL = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  

  const onChangeFilter = (event) => {
    const filterText = event.target.value
    setFilter(filterText);
  }
  const onClickCountry = (countryName) => {
    setFilter(countryName);
  }

  useEffect(() => {
    axios.get(API_COUNTRIES_ALL)
      .then(resp => {
        setCountries(resp.data)
      })
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={onChangeFilter}/>
      <CountriesBody 
        countries={countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))}
        onClickCountry={onClickCountry}
      />
    </div>
  );
}

export default App;
