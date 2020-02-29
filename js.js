window.addEventListener('load', () => {
    let long;
    let lat;
    let temperature_description = document.querySelector('.temperature-description');
    let temperature_degree = document.querySelector('.temperature-degree');
    let location_timezone = document.querySelector('.location-timezone');
    let degree_section = document.querySelector('.degree-section');
    let temperature_span = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/123746b881500ec03291a53fad73ab4b/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary } = data.currently;
                    // set DOM elements from API
                    temperature_degree.textContent = Math.floor(temperature);
                    temperature_description.textContent = summary;
                    location_timezone.textContent = data.timezone;


                    let celcius = (temperature - 32) * (5 / 9);

                    degree_section.addEventListener('click', () => {
                        if (temperature_span.textContent === "F") {
                            temperature_span.textContent = "C";
                            temperature_degree.textContent = Math.floor(celcius);
                        } else {
                            temperature_span.textContent = "F";
                            temperature_degree.textContent = Math.floor(temperature);
                        }
                    })

                });

        });

    }

});