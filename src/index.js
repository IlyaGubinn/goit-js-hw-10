import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce'
import { fetchCountry } from './fetchJS/fetchCountry'


const DEBOUNCE_DELAY = 300;
const inputRef = document.getElementById(`search-box`);
const countryList = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);


inputRef.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));


function searchCountry(event) {
    event.preventDefault();


    const countryName = event.target.value.trim();

    if (countryName !== "") {
        fetchCountry(countryName).then(filterCountry).catch(fetchError);
    }
    else {

        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        
    }
}

function filterCountry(country) {
    if (country.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        
        countryInfo.innerHTML = "";
    }
    else if ((country.length > 1) && (country <= 10)) {
        countryList.innerHTML = country.map(({ name, flags }) => {
            return `<li class="country-item">
                <img src="${flags.svg}" alt="flag" width = 30px>
                <p class="country">${name.official}</p>
                </li>`;
        }).join('');
        countryInfo.innerHTML = "";
    }
    else {
        countryInfo.innerHTML = country.map(({ name, capital, population, flags, languages }) =>
        {
            return `<h3><img src="${flags.svg}" alt="flag" width=40px> ${name.official}</h3>
                <p><b>Capital:</b> ${capital}</p>
                <p><b>Population:</b> ${population}</p>
                <p><b>Languages:</b> ${Object.values(languages)}</p>
            `;
        }).join('');
         countryList.innerHTML = "";
    }
}

function fetchError(error) {
    Notify.failure(`Oops, there is no country with that name`);
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
}
    
    
