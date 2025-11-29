const CONTAINER = document.getElementById('container')


const API_KEY = '80d1993378fa9e47ffc9c7fec53fe1d2' 
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=45.87&lon=8.978&units=metric&appid=' + API_KEY


fetch (API_URL)
        .then (response => response.json)
        .then (data => console.log (data))
        .catch (error => console.log (error))


function showData (data){
    //console.log(data)

    const weatherData = data.list;
    console.log(weatherData)

    for (let item of weatherData){
        //console.log(item)

        const temperature = item.main.temp;
        const tempFix = (temperature + 2) * 5;
        //console.log(temperature);
        //const time = item.dt_txt;

        //substring:
        const time = item.dt_txt.substring(0, 16);
        


        const listItem = document.createElement('li');
        //listItem.textContent = temperature;

        listItem.textContent = `${time}:${temperature}°`

        //let bgColor = 'gray';
        //if (temperature <= 0){
        //    bgColor = 'blue'
        //}
        let bgColor = tempToHSL(temperature);


        //calulate hue according to temperature
        function tempToHSL (temp, minTemp = -5, maxTemp = 50){

            temp = Math.max(minTemp, Math.min(maxTemp, temp))

            const hue = ((maxTemp - temp) / (maxTemp - minTemp)) * 240;

            return `hsl(${hue}, 80%, 50%)`;

        }


        //create bar to display the temperature value through the size
        const tempBar = document.createElement('div');
        tempBar.classList.add('bar');
        tempBar.style.width = `${tempFix}px`
        tempBar.style.backgroundColor = bgColor
        
        
        //``

        listItem.appendChild(tempBar);
        CONTAINER.appendChild(listItem);

    }

}

function showError (error) {
    console.log(error)
}