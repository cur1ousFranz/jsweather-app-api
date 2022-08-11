let api = {
    key : "32aa179d403e64adc0542fb9d8ca8e15",
    base : "https://api.openweathermap.org/data/2.5/",
}

let search = document.querySelector('#search');
search.addEventListener('keypress', (e) => {

    if(e.keyCode == 13){
        getResults(search.value);
    }
});

function getResults(query){

    fetch(`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('#location');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('#date');
    date.innerHTML = getDate(now);

    let temp = document.querySelector('#temp');
    temp.innerHTML = `${Math.round((weather.main.temp - 32) * 5/9)}<span>°c</span>`;

    let weather_el = document.querySelector('#weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hi_low = document.querySelector('#hi-low');
    hi_low.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function getDate(d){

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date}, ${month}, ${year}`;
}