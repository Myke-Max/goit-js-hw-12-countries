import './sass/main.scss';
import countrys from './tamplates/country-cards.hbs'
import API from './js/api'

const refs = {
    countryCards: document.querySelector('.country'),
    searchForm: document.querySelector('.search-form')
}
refs.searchForm.addEventListener('input', onSearch,500)

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value

API.fetchCountryByName(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error))
    .finally(() => form.reset())
}






function renderCountry(country) {
        const markup = countrys(country)
        refs.countryCards.innerHTML = markup
    }
