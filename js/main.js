let body = document.querySelector('#body');

let author = document.querySelector('#autore');

let form = document.querySelector('#form'); // Form d'inserimento città

let button = document.querySelector('#invia');
let testo = document.querySelector('#in-invia');
let spinner = document.querySelector('#spinner');

let reset = document.querySelector('#reset'); // Pulsante reset

let input = document.querySelector("#city"); // Campo di input
// Alerts di errore
let avvertimento = document.querySelector('#avvertimento');
let errore = document.querySelector('#errore');

let pagina = document.querySelector('#pagina'); // Sezione principale che appare quando si fa una ricerca

let weather;

function getWeather() {
    
    reset.classList.remove('d-none'); // Fa apparire il pulsante "reset"

    button.setAttribute('disabled', '');
    testo.classList.add('d-none');
    spinner.classList.remove('d-none');
    
    input.blur(); // Toglie il focus dal campo input

    let cityName = input.value; // Valore inserito nel campo input
    
    if (cityName == 0) { // Se il campo è vuoto
        input.classList.add("is-invalid");
        avvertimento.classList.remove('d-none');
        pagina.classList.add('d-none');

        button.removeAttribute('disabled');
        testo.classList.remove('d-none');
        spinner.classList.add('d-none');
    } else {
        input.classList.remove("is-invalid");
        avvertimento.classList.add('d-none');
        errore.classList.add('d-none');
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f49f974ab3536d74d780021f75e07be5`).then((response) => response.json()).then((data) => {

            
            let info = data.list; // Lista completa delle informazioni
            
            if (info == undefined) { // Se abbiamo scritto male la città
                errore.classList.remove('d-none');
                
                button.removeAttribute('disabled');
                testo.classList.remove('d-none');
                spinner.classList.add('d-none');
            }
            
            let currentWeather = info[0]; // Prendiamo solo il primo elemento (informazioni meteo attuali)
            
            // Prendiamo solo il meteo e la temperatura
            weather = currentWeather.weather;
            let temp = currentWeather.main;
            
            pagina.classList.remove('sereno', 'nuvoloso', 'pioggia');
            
            // Stampare il meteo e tradurlo in italiano
            if (weather[0].main == "Clouds") {
                document.querySelector('#meteo').innerHTML = "Nuvoloso";
                pagina.classList.add('nuvoloso');
            } else if (weather[0].main == "Clear") {
                document.querySelector('#meteo').innerHTML = "Sereno";
                pagina.classList.add('sereno');
            } else if (weather[0].main == "Rain") {
                document.querySelector('#meteo').innerHTML = "Pioggia";
                pagina.classList.add('pioggia');
            };
            
            let tempCelsius = (temp.temp - 273.15).toFixed(1); // Convertiamo la temperatura in Celsius e la arrotondiamo alla prima cifra decimale
            
            document.querySelector('#nomeCittà').innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Stampare la città digitata con la prima lettera maiuscola
            
            
            document.querySelector('#temp').innerHTML = tempCelsius + " °C"; // Stampa la temperatura
        });
    }
};

function delay () {

    body.classList.remove('bg-cloudy', 'bg-clear', 'bg-rain', 'bg-light');

    if (weather[0].main == "Clouds") {
        body.classList.add('bg-cloudy');
    } else if (weather[0].main == "Clear") {
        body.classList.add('bg-clear');
    } else if (weather[0].main == "Rain") {
        body.classList.add('bg-rain');
        author.classList.remove('text-muted');
    };

    button.removeAttribute('disabled');
    testo.classList.remove('d-none');
    spinner.classList.add('d-none');
    
    pagina.classList.remove('d-none'); // Rende visibili le informazioni richieste
}

// Invio delle informazioni
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWeather();
    setTimeout(delay, 1000);
})

// Pulsante "Reset"
reset.addEventListener('click', () => {
    input.value = "";
    input.classList.remove('is-invalid');
    pagina.classList.add('d-none');
    reset.classList.add('d-none');
    avvertimento.classList.add('d-none');
    errore.classList.add('d-none');
    author.classList.add('text-muted');
    body.classList.add('bg-light');
    input.focus();
});