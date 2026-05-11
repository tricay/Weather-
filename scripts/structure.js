const aboutContent = document.getElementById('aboutContent');
const helpContent = document.getElementById('helpContent');
const motivationContent = document.getElementById('motivationContent');
const weatherContent = document.getElementById('weatherContent');
const menu = document.getElementById("menu");
const impor = document.getElementById("impor");
const tabs = document.querySelectorAll(".tabs");
const holders = document.querySelectorAll(".holder");

menu.addEventListener('click', ()=>{
   impor.classList.toggle("hide");
   if (impor.classList.contains("hide")) {
    menu.innerHTML = "<strong>☰</strong>";
      } else {
    menu.innerHTML = "❌";
     }
});

tabs.forEach(tab =>{
  tab.addEventListener("click", (e)=>{
    e.preventDefault();
    const targetId = tab.dataset.target;
    
    tabs.forEach(sec =>{
    sec.classList.remove("active");
    });
     
    holders.forEach(hold =>{
      hold.classList.remove("active");
    });
    tab.classList.add("active");
    document.getElementById(targetId).classList.add("active");
    document.getElementById(targetId).style.animation ="fadein 1s ease-in";
  });
});
