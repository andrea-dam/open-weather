let pagina = document.querySelector('#pagina');

function getWeather () {
    
    let cityName = document.querySelector("#city").value;
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f49f974ab3536d74d780021f75e07be5`).then((response) => response.json()).then((data) => {
        
        console.log(data.list);

        // Lista completa delle informazioni
        let info = data.list;

        console.log(info[0]);
        // Prendiamo solo il primo elemento (informazioni meteo attuali)
        let currentWeather = info[0];

        // Prendiamo solo il meteo e la temperatura
        let weather = currentWeather.weather;

        let temp = currentWeather.main;

        console.log(temp.temp);

        // Convertiamo la temperatura in Celsius e la arrotondiamo alla prima cifra decimale
        let tempCelsius = (temp.temp - 273.15).toFixed(1);

        console.log(currentWeather.weather);

        console.log(tempCelsius);

        // Rendere visibili le informazioni richieste
        if (cityName != 0) {
            pagina.classList.remove('d-none');
        }

        // Stampare la città digitata con la prima lettera maiuscola
        document.querySelector('#nomeCittà').innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        
        // Stampare il meteo
        document.querySelector('#meteo').innerHTML = weather[0].main;

        // Stampare la temperatura
        document.querySelector('#temp').innerHTML = tempCelsius + " °C";
    });

    if (cityName == 0) {
        document.querySelector("#city").classList.add("is-invalid");
    } else {
        document.querySelector("#city").classList.remove("is-invalid");
    }
};


