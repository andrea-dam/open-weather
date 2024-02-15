import API_KEY from "../api-key.js";

const body = document.querySelector("#body")! as HTMLBodyElement;

const author = document.querySelector("#autore")! as HTMLHeadingElement;

const form = document.querySelector("#form")! as HTMLFormElement; // Form d'inserimento città

const button = document.querySelector("#invia")! as HTMLButtonElement;
const testo = document.querySelector("#in-invia")! as HTMLDivElement;
const spinner = document.querySelector("#spinner")! as HTMLDivElement;

const reset = document.querySelector("#reset")! as HTMLButtonElement; // Pulsante reset

const input = document.querySelector("#city")! as HTMLInputElement; // Campo di input
// Alerts di errore
const avvertimento = document.querySelector("#avvertimento")! as HTMLDivElement;
const errore = document.querySelector("#errore")! as HTMLDivElement;

const pagina = document.querySelector("#pagina")! as HTMLDivElement; // Sezione principale che appare quando si fa una ricerca

let weather: object = {};

function getWeather() {
	reset.classList.remove("d-none"); // Fa apparire il pulsante "reset"

	button.setAttribute("disabled", "");
	testo.classList.add("d-none");
	spinner.classList.remove("d-none");

	input.blur(); // Toglie il focus dal campo input

	const cityName = input.value; // Valore inserito nel campo input

	if (!cityName) {
		// Se il campo è vuoto
		input.classList.add("is-invalid");
		avvertimento.classList.remove("d-none");
		pagina.classList.add("invisible");

		button.removeAttribute("disabled");
		testo.classList.remove("d-none");
		spinner.classList.add("d-none");
	} else {
		input.classList.remove("is-invalid");
		avvertimento.classList.add("d-none");
		errore.classList.add("d-none");

		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
			.then(response => response.json())
			.then(data => {
				const info = data.list; // Lista completa delle informazioni

				if (info == undefined) {
					// Se abbiamo scritto male la città
					errore.classList.remove("d-none");

					button.removeAttribute("disabled");
					testo.classList.remove("d-none");
					spinner.classList.add("d-none");
				}

				const currentWeather = info[0]; // Prendiamo solo il primo elemento (informazioni meteo attuali)

				// Prendiamo solo il meteo e la temperatura
				weather = currentWeather.weather;
				const temp = currentWeather.main;

				pagina.classList.remove("sereno", "nuvoloso", "pioggia");

				// Stampare il meteo e tradurlo in italiano
				if (weather[0].main == "Clouds") {
					document.querySelector("#meteo")!.innerHTML = "Nuvoloso";
					pagina.classList.add("nuvoloso");
				} else if (weather[0].main == "Clear") {
					document.querySelector("#meteo")!.innerHTML = "Sereno";
					pagina.classList.add("sereno");
				} else if (weather[0].main == "Rain") {
					document.querySelector("#meteo")!.innerHTML = "Pioggia";
					pagina.classList.add("pioggia");
				}

				const tempCelsius = (temp.temp - 273.15).toLocaleString("it-IT", { maximumFractionDigits: 1, minimumFractionDigits: 1 }); // Convertiamo la temperatura in Celsius e la arrotondiamo alla prima cifra decimale

				document.querySelector("#nomeCittà")!.innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Stampa la città digitata con la prima lettera maiuscola

				document.querySelector("#temp")!.innerHTML = tempCelsius + " °C"; // Stampa la temperatura
			});
	}
}

function delay() {
	body.classList.remove("bg-cloudy", "bg-clear", "bg-rain", "bg-light");

	if (weather[0].main == "Clouds") {
		body.classList.add("bg-cloudy");
	} else if (weather[0].main == "Clear") {
		body.classList.add("bg-clear");
	} else if (weather[0].main == "Rain") {
		body.classList.add("bg-rain");
		author.classList.remove("text-muted");
	}

	button.removeAttribute("disabled");
	testo.classList.remove("d-none");
	spinner.classList.add("d-none");

	pagina.classList.remove("invisible"); // Rende visibili le informazioni richieste
}

// Invio delle informazioni
form.addEventListener("submit", event => {
	event.preventDefault();
	getWeather();
	setTimeout(delay, 1000);
});

// Pulsante "Reset"
reset.addEventListener("click", () => {
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
