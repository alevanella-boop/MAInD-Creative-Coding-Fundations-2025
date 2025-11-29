const CONTAINER = document.getElementById('container')


const API_KEY = 'c38972a06413ebddd1bfa6a0225c01bc' 
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=45.87&lon=8.978&units=metric&appid=' + API_KEY



fetch (API_URL)
        .then (response => response.json)
        .then (data => console.log (data))
        .catch (error => console.log (error))


function showData (data){
    //console.log(data)

    const weatherData = data.list;
    console.log(weatherData)


}

function showError (error) {
    console.log(error)
}