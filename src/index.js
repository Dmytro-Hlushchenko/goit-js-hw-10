
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryNameInput = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const result = fetchCountries();
countryNameInput.addEventListener('input', debounce(onCountryNameInput, DEBOUNCE_DELAY));

function onCountryNameInput(e) {
    const country = countryNameInput.value.trim();
    
    console.log(country)
    if (country.length === 0) {
        countryListEl.innerHTML = '';
        return
    }

    fetchCountries(country)
        .then((countries) => createGallery(countries))
        .catch(onErrore);
    
    
    function createGallery(items) {
        if (items.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
        }
        if (items.length >= 2 && items.length <= 10) {
            const list = items.reduce((markup, item) => markup + createSmallCountryCard(item), "");
            countryListEl.innerHTML = list;
            return
        }
            const list = items.reduce((markup, item) => markup + createCountryCard(item), "");
            countryListEl.innerHTML = list;
    };
    
    function createSmallCountryCard({ flags, name }) {
        return `<li>
        <img src = "${flags.svg}" width = 30 height = 20 >   ${name.official}</img>
        </li>`

    };
    
    function createCountryCard({flags, name, capital, population, languages}) {
        return `<li>
        <img src = "${flags.svg}" width = 50 hiegth = 40></img>
        <p>${name.official}</p>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>
        </li>`
    };

    function onErrore(err) {
        countryListEl.innerHTML = '';
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
} ;
