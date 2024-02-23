const countriess = document.getElementById("countries");
const input = document.getElementById("search-inp");
const sort1 = document.getElementById("sort");
const filter = document.getElementById("Region");
const btn1 = document.getElementById("button1");
const pagination = document.getElementById("pagination");
/////Darkmode
function myFunction() {
  const body = document.body;
  body.classList.toggle("dark-modee");
}

function displayCountries(regions) {
  let str = "";
  regions?.forEach((country) => {
    str += `
      <a class="card" id="card" href="/details%20page/country.html?id=${country.name.common}">
      <img src="${country.flags.svg}"  />
      <h2>${country.name.common}</h2>
     
      <div class= "card-content" id="card-content">
      
      <h4>Population :${country.population}</h4>
      <h4>Region :${country.region}</h4>
      <h4>Capital :${country.capital}</h4>
      
      
      
      </div>
      
      
      
      </a>
      
      `;
  });
  countriess.innerHTML = str;
}

/////display
async function getCountries() {
  try {
    const res = await fetch(`https://countries-restapi.vercel.app/all`);
    const data = await res.json();
    console.log(data);
    displayCountries(data?.data);
    Search(data?.data);
    Filter(data?.data);
 Sort(data?.data);
    
  } catch (error) {
    console.log(error);
  }
}
getCountries();



// search

function Search(data) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase(e);
    let searchData = data?.filter((el) => {
      return (
        el?.region?.toLowerCase().includes(value) ||
        el?.name?.common?.toLowerCase().includes(value)
      );
    });
    displayCountries(searchData);
  });
}



////filter by region
function Filter(data){
 filter.addEventListener('change',function(e){
  let value = e.target.value;
  let filterData = 
   value === 'All'? data : data?.filter((rg)=>
   rg.region ===value);
  displayCountries(filterData);
 });
}

////sort
function Sort(data){
sort1.addEventListener('change',(e)=>{
  let value = e.target.value;
  if(value === 'population'){
    data.sort((a,b)=>b?.population-a?.population);
  } 
  if(value === 'all'){
getCountries(data);
  }
  if(value === 'region'){
    data.sort((a,b)=>{
let regionA = a.region.toLowerCase();
let regionB = b.region.toLowerCase();
if(regionA<regionB){
  return -1;
}
    });
  }
  if(value === "capital"){
    data.sort(function(e,v){
if(e.capital<v.capital)
return -1;
    });

  }
  if(value === "name"){
    data.sort((s,g)=>{
      if(s.name.common.toLowerCase()>g.name.common.toLowerCase());
      return -1;
    })
  }



displayCountries(data);  
})
}
Sort();




