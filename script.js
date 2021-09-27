window.addEventListener('load', () => {
    let lat;
    let long;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');



        //console.log(lat);
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
             lat = position.coords.latitude ; 
             long = position.coords.longitude;
            // console.log(lat);
            // console.log(long);

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summery, icon}= data.currently;
                    temperatureDescription.textContent = summery;
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = data.timezone;

                    setIcons(icon, document.querySelector('.icon'));

                    let celsius = (temperature - 32) * (5 / 9);

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.fround( celsius);
                        } else {
                            temperatureSpan.textContent = 'F';
                        }
                    })
                });
        });
    }
    function setIcons(icon, iconID){
        const skycons = new skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);

    }

});

