import React from 'react';

const CountryList = ({countries, onShowCountryView}) => {
  return countries
            .map(c => (
              <div 
                key={c.name.common}
              >
                {c.name.common}
                <button 
                  onClick={() => onShowCountryView(c.name.common)}
                >
                  View
                </button>
              </div>
            )) || null
}
export default CountryList;