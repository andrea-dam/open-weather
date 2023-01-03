// Pulsanti
let invia = document.querySelector('#button');
let reset = document.querySelector('#reset');
// Campo di input
let input = document.querySelector("#city");
// Alerts di errore
let avvertimento = document.querySelector('#avvertimento');
let errore = document.querySelector('#errore');
// Sezione principale che appare quando si fa una ricerca
let pagina = document.querySelector('#pagina');
// Icona meteo
let weatherIcon = document.querySelector('#icona-meteo');

function getWeather () {
    
    let cityName = input.value;
    
    if (cityName == 0) {
        input.classList.add("is-invalid");
        avvertimento.classList.remove('d-none');
    } else {
        input.classList.remove("is-invalid");
        avvertimento.classList.add('d-none');
        errore.classList.add('d-none');
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f49f974ab3536d74d780021f75e07be5`).then((response) => response.json()).then((data) => {

            
            // console.log(data.list);
            
            // Lista completa delle informazioni
            let info = data.list;
            
            // Se abbiamo scritto male la città
            if (info == undefined) {
                errore.classList.remove('d-none');
            }
            // Prendiamo solo il primo elemento (informazioni meteo attuali)
            let currentWeather = info[0];
            
            // Prendiamo solo il meteo e la temperatura
            let weather = currentWeather.weather;
            
            let temp = currentWeather.main;
            
            // console.log(temp.temp);
            
            // Convertiamo la temperatura in Celsius e la arrotondiamo alla prima cifra decimale
            let tempCelsius = (temp.temp - 273.15).toFixed(1);
            
            // console.log(currentWeather.weather);
            
            // console.log(tempCelsius);
            
            
            // Stampare la città digitata con la prima lettera maiuscola
            document.querySelector('#nomeCittà').innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1);
            
            // Stampare il meteo
            if (weather[0].main == "Clouds") {
                document.querySelector('#meteo').innerHTML = "Nuvoloso";
                weatherIcon.classList.add('fa-cloud-sun');
            } else if (weather[0].main == "Clear") {
                document.querySelector('#meteo').innerHTML = "Sereno";
                weatherIcon.classList.add('fa-sun');
            } else if (weather[0].main == "Rain") {
                document.querySelector('#meteo').innerHTML = "Pioggia";
                weatherIcon.classList.add('fa-cloud-rain');
            };
            
            // Stampare la temperatura
            document.querySelector('#temp').innerHTML = tempCelsius + " °C";

            // Rendere visibili le informazioni richieste
            pagina.classList.remove('d-none');
        });
    }
};

// Pulsante "Invia"
invia.addEventListener('click', () => {
    reset.classList.remove('d-none');
    getWeather();
});

// Quando si preme "Invio" sulla tastiera
input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        reset.classList.remove('d-none');
        input.blur();
        getWeather();
    }
});

// Pulsante "Reset"
reset.addEventListener('click', () => {
    input.value = "";
    pagina.classList.add('d-none');
    reset.classList.add('d-none');
    avvertimento.classList.add('d-none');
    errore.classList.add('d-none');
    input.focus();
});