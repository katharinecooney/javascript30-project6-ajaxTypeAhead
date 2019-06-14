const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch will pull the data from the endpoint that we pass
// fetch will not return the data - it will return a promise!

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))
  
findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  })
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions')

// this function was pulled from StackOverflow; if will add commas to our populations
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// this function will be called anytime someone changes the value in the search bar
function displayMatches() {
  const foundMatches = findMatches(this.value, cities);
  const html = foundMatches.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
    return `<li>
      <span>${cityName}, ${stateName}</span>
      <span>${numberWithCommas(place.population)}</span>
    </li>`
  }).join('');
  suggestions.innerHTML = html;
}

// the change event is triggered only when we click out of the search bar after typing; for this reason, we also add an event listener on keyup
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
