//Виконай санітизацію введеного рядка методом trim(), це вирішить проблему, коли в полі введення тільки пробіли, або вони є на початку і
// в кінці рядка.
import  debounce  from 'lodash.debounce';
import './css/styles.css';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryNameInput = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const result = fetchCountries();
countryNameInput.addEventListener('input', debounce(onCountryNameInput, DEBOUNCE_DELAY));

function onCountryNameInput(e) {
     e.preventDefault();
    const country = countryNameInput.value.trim();
    if (country.length === 0) {
        console.log('No DATA');
        countryListEl.innerHTML = '';

    }
    fetchCountries(country)
        .then((countries) => createGallery(countries))
        .catch(onErrore);
    
        function createGallery(items) {
            const list = items.reduce((markup, item) => markup + createCountryCard(item), "");
            countryListEl.innerHTML = list;
     }; 
    
    function createCountryCard({flags, name, capital, population, languages}) {
        console.log(flags.svg)
        return `<li>
        <img src = "${flags.svg}" width = 30 hiegth = 30></img>
        <p>Country: ${name.official}</p>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        
        <p>Languages: ${Object.values(languages)}</p>
        </l/i>`
    };

        function onErrore(err) { 
            console.error(err);
        }
    
} ;
