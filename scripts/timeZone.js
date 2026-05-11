  const day = document.getElementById('day');
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const year = document.getElementById('year');
  const timeFormat = {hour: 'numeric', minute: 'numeric', hour12: true};
  const dateFormat = {day: 'numeric', month: 'short', year: 'numeric'};
  
  
  function timing(){
    let clock; 
    let clocktime;
    let daytime;
    const today = new Date();
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dayname = dayNames[today.getDay()];
    clock= today.toLocaleDateString('en-MW', dateFormat);
    clocktime = today.toLocaleString('en-MW',timeFormat);
    const yearValue = today.getFullYear();
    
    day.innerHTML = `${dayname}'s motivation`;
    date.innerHTML = clock ;
    time.innerHTML = clocktime ; 
    year.innerHTML =  yearValue;  
  
  }
  
  timing();
  setInterval(timing, 1000);
  


