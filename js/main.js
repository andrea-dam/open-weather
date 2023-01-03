let form = document.querySelector('#form'); // Form d'inserimento città

let reset = document.querySelector('#reset'); // Pulsante reset

let input = document.querySelector("#city"); // Campo di input
// Alerts di errore
let avvertimento = document.querySelector('#avvertimento');
let errore = document.querySelector('#errore');

let pagina = document.querySelector('#pagina'); // Sezione principale che appare quando si fa una ricerca

let weatherIcon = document.querySelector('#icona-meteo'); // Icona meteo

function getWeather() {
    
    reset.classList.remove('d-none'); // Fa apparire il pulsante "reset"
    
    input.blur(); // Toglie il focus dal campo input

    let cityName = input.value; // Valore inserito nel campo input
    
    if (cityName == 0) {
        input.classList.add("is-invalid");
        avvertimento.classList.remove('d-none');
    } else {
        input.classList.remove("is-invalid");
        avvertimento.classList.add('d-none');
        errore.classList.add('d-none');
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f49f974ab3536d74d780021f75e07be5`).then((response) => response.json()).then((data) => {
            
            let info = data.list; // Lista completa delle informazioni
            
            if (info == undefined) { // Se abbiamo scritto male la città
                errore.classList.remove('d-none');
            }
            
            let currentWeather = info[0]; // Prendiamo solo il primo elemento (informazioni meteo attuali)
            
            // Prendiamo solo il meteo e la temperatura
            let weather = currentWeather.weather;
            let temp = currentWeather.main;
            
            let tempCelsius = (temp.temp - 273.15).toFixed(1); // Convertiamo la temperatura in Celsius e la arrotondiamo alla prima cifra decimale

            document.querySelector('#nomeCittà').innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Stampare la città digitata con la prima lettera maiuscola
            
            // Stampare il meteo e tradurlo in italiano
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
            
            document.querySelector('#temp').innerHTML = tempCelsius + " °C"; // Stampa la temperatura

            pagina.classList.remove('d-none'); // Rende visibili le informazioni richieste
        });
    }
};

// Invio delle informazioni
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWeather();
})

// Pulsante "Reset"
reset.addEventListener('click', () => {
    input.value = "";
    pagina.classList.add('d-none');
    reset.classList.add('d-none');
    avvertimento.classList.add('d-none');
    errore.classList.add('d-none');
    input.focus();
});