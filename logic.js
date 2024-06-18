document.getElementById('myCity').addEventListener('keydown', function(event) {
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        // Prevent the default action, if any
        event.preventDefault();
        // Call your function here
        searchCity();
    }
});

searchCity=async()=>{
let cityName = myCity.value
console.log(cityName);

// fetch the weather api of enterd city
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=315a06d7317352ab9cc6a1baf6ce2ac2`)

response.json().then((data)=>{
    console.log(data);
    // changing city name
    city.innerHTML=`${data.name}`

    // getting temprature
    tempKelvin=data.main.temp
    // changing kelvininto celcious
    tempCelsious=kelvinToCelcious(tempKelvin)
    temp.innerHTML=`${tempCelsious}℃`

    // getting and setting icon
    data.weather.forEach((item)=>{
        icon.innerHTML=`<img width="100%" class="iconClimate" src="https://openweathermap.org/img/wn/${item.icon}.png" alt="">` 
    })
   

    // Extract the timezone offset from the response (in seconds)
    const timezoneOffset = data.timezone;
    // Extract the current time in Unix timestamp from the response
    const currentTimestamp = data.dt;
       // Convert Unix timestamp to JavaScript Date object
       const currentDateUTC = new Date(currentTimestamp * 1000);
       // Get the local time by adjusting for the timezone offset
       const currentDateLocal = new Date((currentTimestamp + timezoneOffset) * 1000);
       // Extract the timezone in hours and minutes
       const timezoneOffsetHours = Math.floor(timezoneOffset / 3600);
       const timezoneOffsetMinutes = Math.abs((timezoneOffset % 3600) / 60);
       // Format the timezone as a string
       const timezoneString = `UTC${timezoneOffsetHours >= 0 ? '+' : ''}${timezoneOffsetHours}:${timezoneOffsetMinutes.toString().padStart(2, '0')}`;
       // Format options for date and time
       const options = { 
         weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
         hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' 
       };
        //console.log(`Timezone: ${timezoneString}`);
        //console.log(`Current Date and Time (UTC): ${currentDateUTC.toLocaleString('en-US', options)}`);
        //console.log(`Current Date and Time (Local): ${currentDateLocal.toLocaleString('en-US', options)}`);
        td.innerHTML=`${currentDateLocal.toLocaleString('en-US', options)}`

        // feels like 
        let flKelvin = data.main.feels_like
        let flCelsious = kelvinToCelcious(flKelvin)
        fl.innerHTML=`${flCelsious}°`

        // getting humidity
        humidity.innerHTML=`${data.main.humidity}%`

        // getting wind
        sl.innerHTML=`${data.wind.speed}m/h`

        // minTemp
        let minTempK = data.main.temp_min
        let mintempC = kelvinToCelcious(minTempK)
        minT.innerHTML=`${mintempC}℃`

        // maxTemp
        let maxTempK = data.main.temp_max
        let maxTempC = kelvinToCelcious(maxTempK)
        maxT.innerHTML=`${maxTempC}℃`

        // Pressure
        pressure.innerHTML=`${data.main.pressure}hPa`
})


}

// function to convert kelvin into celcious scale
const kelvinToCelcious=(kelvin)=>{
    return (kelvin - 273.15).toFixed(2);
}