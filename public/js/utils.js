console.log('Client side javascript is loaded');

function getWeather(location) {
    return fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(res => res);
}

const formRef = document.querySelector('form');
const searchInputElem = document.querySelector('input');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const imageRef = document.querySelector('#weather-image');

formRef.addEventListener('submit', async function (event) {
    event.preventDefault();
    const { value } = searchInputElem;
    if (value) {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        
        const weatherData = await getWeather(value);
        
        if (weatherData.error) {
            messageOne.textContent = weatherData.error;
            return;
        }
        const { location, current } = weatherData || {};
        const { name, country, region } = location || {};
        const { 
            temperature
            ,visibility
            ,weather_descriptions
            ,weather_icons
            ,humidity
         } = current || {};
         console.log(weatherData);
        messageOne.textContent = `You searched for ${name} - ${region} - ${country}`;
        messageTwo.textContent = `Temperature is ${temperature}f, Visibility is ${visibility}, weather is ${weather_descriptions[0]}`
        imageRef.src = weather_icons[0];
        imageRef.width = 100
    }
});