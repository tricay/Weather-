  const author = document.getElementById('author');
  const quote = document.getElementById('quote');
  const getQuote = document.getElementById('getQuote');
  const forecaster = document.getElementById('forecaster');
  const currentIcon = document.getElementById('currentIcon');
  const forecastIcon = document.getElementById('forecastIcon');
  const searchIcon = document.getElementById('searchIcon');
  const place = document.getElementById('location');
  const temp = document.getElementById('temp');
  const tempTwo = document.getElementById('tempTwo');
  const climate = document.getElementById('climate');
  const climateTwo = document.getElementById('climateTwo');
  const searchPlace = document.getElementById('searchPlace');
  const searchError = document.getElementById("searchError");
  const errorOne = document.getElementById('errorOne');
  const errorTwo = document.getElementById('errorTwo');
  const getWeather = document.getElementById('getWeather');
  let mykey = '0160b237ebb24cc99a581047260501';


function showQuote(){

  fetch('https://zenquotes.io/api/random')
  .then(response=>response.json())
  .then( data =>{
      const dayQuote = data[0];
    quote.innerHTML = `${dayQuote.q}`;
    author.innerHTML = `${dayQuote.a}`;  
      
  })
  .catch(error => quote.innerHTML= `Oops! failed to load a quote , try again later`);
  }

  getQuote.addEventListener('click',showQuote);


function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
    allset,
    geoError);
  }else {
    alert('Browser couldn\'t get Location');
  }
};

function allset(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  currentWeather(latitude, longitude);
  forecastWeather(latitude, longitude);
}
  
function geoError(error){
  console.error(error.message);
  alert(`there was a problem getting your position: ${error.message}`);
}
      
       
  async function currentWeather(latitude, longitude){
    try{
      
    const response = await fetch(`https://api.weatherstack.com/current?access_key=cf9ae1424d0f6bcb5bfaaa521c077326&query=${latitude},${longitude}`);

      if (!response.ok){
        throw new Error("can't connect to servers!");
      }
      const data = await response.json();
    
      
   currentIcon.src = data.current.weather_icons;  
   place.innerHTML = `${data.location.name}, ${data.location.country}`;
   temp.innerHTML = `${data.current.temperature}°C`;  
   climate.innerHTML = data.current.weather_descriptions;  
    
    }
   catch(error){
     setTimeout(()=>{errorOne.innerHTML =`Oops! couldn't get weather update: ${error.message}`},3000);
     console.error(error.message);
   }
  }

  async function forecastWeather(latitude,longitude){
    try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0160b237ebb24cc99a581047260501&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`);
          if (!response.ok){
        throw new Error("can't connect to servers!");
      }
    const data = await response.json();
      
    const dayforecast = data.forecast.forecastday[0];
   forecastIcon.src = `https:${dayforecast.day.condition.icon}`;
   tempTwo.innerHTML = `${dayforecast.day.avgtemp_c}°C`;
   climateTwo.innerHTML = dayforecast.day.condition.text;         
    }
   catch(error){
     errorTwo.innerHTML =`Oops! couldn't get weather update:${error.message}`;
     setTimeout(()=>{errorTwo.innerHTML="";},3000);
     console.error(error);
     
      }
  }

getWeather.addEventListener('click', ()=>{
getLocation();
    searchError.innerHTML = "showing weather of local position!";
}
);


 function weatherSearch(){
   if(searchPlace.value == ''){
     searchError.textContent ="please type your location";
     setTimeout(()=>{searchError.innerHTML="";},2000);
     return;
   }
  let located = encodeURIComponent(searchPlace.value);
   
   fetch(`https://api.weatherapi.com/v1/search.json?key=${mykey}&q=${located}&aqi=no`)
   .then( response => response.json())
   .then( data=>{
     
     if(data.length === 0){
       throw new Error("location not found");
     }
     
       const lat = data[0].lat;
       const lon = data[0].lon;
       
       currentWeather(lat, lon);
       forecastWeather(lat, lon);

       searchError.innerHTML = `showing weather for ${searchPlace.value}`;
     
   }
   )
   .catch(error=>{
   console.error(error);
   searchError.innerHTML= "Failed to get Location";
   setTimeout(()=>{searchError.innerHTML="";},2000);  
   });
 } 

searchIcon.addEventListener('click', weatherSearch);
searchPlace.addEventListener('keydown',(e)=>{ 
  if(e.key == "Enter"){
      weatherSearch();
  }
});
