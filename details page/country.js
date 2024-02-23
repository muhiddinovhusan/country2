const countryDetails = document.querySelector(".country-details");
const id = new URLSearchParams(window.location.search).get("id");
const btn = document.getElementById("btn");
function myFunction(){
    const body = document.body;
    body.classList.toggle("dark-modee");
}

function displayDetails(dspdetails){
let str = '';
dspdetails?.forEach((details)=>{
    if(details.name.common == id){
        str += `
       
       <div class="card-left">
      
       
       <img src="${details.flags.svg}"/>
       </div>


       <div class="card-right">
       
       <h2>${details.name.common}</h2>
      
       <div class= "card-content">
       <h4>NativeName :${details.name.nativeName}</h4>
       <h4>Population :${details.population}</h4>
       <h4>Region :${details.region}</h4>
       <h4>Sub Region :${details.subregion}</h4>
       <h4>Capital :${details.capital}</h4>
       </div>
       <div class="card-content-2">
       <h4> :${details.name}</h4>
       <h4>Currensies :${details.region}</h4>
       
       <h4>Languages :${details.languages}</h4>
       
       </div>
    
       <div class="card-content-3">
       <h4> Border countries :<div class="borders"> ${details.borders}</div></h4>
    
       </div>
        </div>
        
        `;
    }
})
countryDetails.innerHTML= str;
}

async function getCountries() {
  try {
    const res = await fetch(`https://countries-restapi.vercel.app/all`);
    const data = await res.json();
    console.log(data);
    displayDetails(data?.data);
  } catch (error) {
    console.log(error);
  }
}
getCountries();


  btn.addEventListener('click',function(){
    location.href ="/mainpage/index.html"
  })