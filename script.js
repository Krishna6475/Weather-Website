document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'd938710dc7ec7ceecb8adfdc4dde71dd'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('weatherDisplay').innerHTML = '';
    document.getElementById('errorDisplay').style.display = 'none';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loadingSpinner').style.display = 'none';
            if (data.cod === 200) {
                const weatherDisplay = document.getElementById('weatherDisplay');
                const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherDisplay.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${weatherIconUrl}" alt="${data.weather[0].description}">
                    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                `;
            } else {
                showError(data.message);
            }
        })
        .catch(error => {
            document.getElementById('loadingSpinner').style.display = 'none';
            showError('An error occurred while fetching the weather data.');
            console.error('Error fetching the weather data:', error);
        });
});

function showError(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.style.display = 'block';
    errorDisplay.textContent = message;
}
