var body = document.querySelector("#body");
var author = document.querySelector("#autore");
var form = document.querySelector("#form"); // Form d'inserimento città
var button = document.querySelector("#invia");
var testo = document.querySelector("#in-invia");
var spinner = document.querySelector("#spinner");
var reset = document.querySelector("#reset"); // Pulsante reset
var input = document.querySelector("#city"); // Campo di input
// Alerts di errore
var avvertimento = document.querySelector("#avvertimento");
var errore = document.querySelector("#errore");
var pagina = document.querySelector("#pagina"); // Sezione principale che appare quando si fa una ricerca
var weather;
function getWeather() {
    reset.classList.remove("d-none"); // Fa apparire il pulsante "reset"
    button.setAttribute("disabled", "");
    testo.classList.add("d-none");
    spinner.classList.remove("d-none");
    input.blur(); // Toglie il focus dal campo input
    var cityName = input.value; // Valore inserito nel campo input
    if (!cityName) {
        // Se il campo è vuoto
        input.classList.add("is-invalid");
        avvertimento.classList.remove("d-none");
        pagina.classList.add("invisible");
        button.removeAttribute("disabled");
        testo.classList.remove("d-none");
        spinner.classList.add("d-none");
    }
    else {
        input.classList.remove("is-invalid");
        avvertimento.classList.add("d-none");
        errore.classList.add("d-none");
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityName, "&appid=f49f974ab3536d74d780021f75e07be5"))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var info = data.list; // Lista completa delle informazioni
            if (info == undefined) {
                // Se abbiamo scritto male la città
                errore.classList.remove("d-none");
                button.removeAttribute("disabled");
                testo.classList.remove("d-none");
                spinner.classList.add("d-none");
            }
            var currentWeather = info[0]; // Prendiamo solo il primo elemento (informazioni meteo attuali)
            // Prendiamo solo il meteo e la temperatura
            weather = currentWeather.weather;
            var temp = currentWeather.main;
            pagina.classList.remove("sereno", "nuvoloso", "pioggia");
            // Stampare il meteo e tradurlo in italiano
            if (weather[0].main == "Clouds") {
                document.querySelector("#meteo").innerHTML = "Nuvoloso";
                pagina.classList.add("nuvoloso");
            }
            else if (weather[0].main == "Clear") {
                document.querySelector("#meteo").innerHTML = "Sereno";
                pagina.classList.add("sereno");
            }
            else if (weather[0].main == "Rain") {
                document.querySelector("#meteo").innerHTML = "Pioggia";
                pagina.classList.add("pioggia");
            }
            var tempCelsius = (temp.temp - 273.15).toLocaleString("it-IT", { maximumFractionDigits: 1, minimumFractionDigits: 1 }); // Convertiamo la temperatura in Celsius e la arrotondiamo alla prima cifra decimale
            document.querySelector("#nomeCittà").innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Stampare la città digitata con la prima lettera maiuscola
            document.querySelector("#temp").innerHTML = tempCelsius + " °C"; // Stampa la temperatura
        });
    }
}
function delay() {
    body.classList.remove("bg-cloudy", "bg-clear", "bg-rain", "bg-light");
    if (weather[0].main == "Clouds") {
        body.classList.add("bg-cloudy");
    }
    else if (weather[0].main == "Clear") {
        body.classList.add("bg-clear");
    }
    else if (weather[0].main == "Rain") {
        body.classList.add("bg-rain");
        author.classList.remove("text-muted");
    }
    button.removeAttribute("disabled");
    testo.classList.remove("d-none");
    spinner.classList.add("d-none");
    pagina.classList.remove("invisible"); // Rende visibili le informazioni richieste
}
// Invio delle informazioni
form.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather();
    setTimeout(delay, 1000);
});
// Pulsante "Reset"
reset.addEventListener("click", function () {
    pagina.classList.add("invisible");
    input.value = "";
    input.classList.remove("is-invalid");
    reset.classList.add("d-none");
    avvertimento.classList.add("d-none");
    errore.classList.add("d-none");
    author.classList.add("text-muted");
    body.classList.add("bg-light");
    input.focus();
});
