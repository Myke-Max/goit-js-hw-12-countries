import './sass/main.scss';
import countrys from './tamplates/country-cards.hbs'

const refs = {
    countryCards : document.querySelector('.country')
}

fetch('https://restcountries.eu/rest/v2/name/portugal')
    .then(response => response.json())
    .then(country => {
        const markup = countrys(country)
        refs.countryCards.innerHTML = markup
        
    }
        
       )
    .catch(error => console.log(error))
