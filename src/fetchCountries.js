export { fetchCountries };

function fetchCountries(country) {
    return fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`)
        .then((data) => data.json())
}