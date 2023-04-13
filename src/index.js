//Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.
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
countryNameInput.addEventListener('input', debounce(onCoutryNameInput, DEBOUNCE_DELAY));

function onCoutryNameInput(e) {
     e.preventDefault();
    const country = countryNameInput.value.trim();
    if (country.length === 0) {
        console.log('No DATA');
        return;
    }
    fetchCountries(country)
        .then((countries) => console.log(countries))
         
} ;


//  function createGallery(items) {
//     return items.map(({ preview, original, description }) => {
//         return `<li class="gallery__item">
//                      <img class="gallery__image" src="${preview}" alt="${description}"/>
//                      <p class = "item_field">${}</p>                      
//                 </li>`;
//     }).join('');
// }; 