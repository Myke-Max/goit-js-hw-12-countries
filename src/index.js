import './sass/main.scss';
import countries from './tamplates/country-cards.hbs'
import countriesList from './tamplates/country-list.hbs'
import API from './js/api'
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import { notice, info, success, error } from '@pnotify/core';
defaults.delay = 3000;
defaults.remove = true;
defaults.mouseReset = true;



notice({
    text :"Welcome to our service"
})

const refs = {
    countryCards: document.querySelector('.country'),
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
}
refs.searchForm.addEventListener('input', debounce(onSearch, 500))
refs.searchInput.addEventListener.keypress(function(e) {
  //Enter key
  if (e.code == 13) {
    return false;
  }
});
function onSearch(e) {

    e.preventDefault();
    const searchQuery = e.target.value.trim()

API.fetchCountryByName(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error))
}

function renderCountry(country) {
    if (country.status === 404) {
        error({
            text: "Wow WoW something is wrong"
        })
        return
    }

    else if (country.length === 1) {
        const markup = countries(country)
        refs.countryCards.innerHTML = markup;

        success({
            text: "Hey, we found what you were looking for.",
            
        });
        return
    }
    else if (country.length > 1 && country.length <= 10) {
        const markupList = countriesList(country);
        refs.countryCards.innerHTML = markupList;
        info({
            text: "Specify your request please"
        })
        return
    }
    

    else if (country.length > 10) {
        refs.countryCards.innerHTML = ''
        error({
            text: "too many matches please specify your request"
        })
        return
    }
    
    }
        
