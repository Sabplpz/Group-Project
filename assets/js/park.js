// National park API

// Variables used for fetch request
var authKey = "hZTRWNMJEAweO66zqYvfTWY1QIH0517Azwjbs1VH";

// Variables to store user input of dropdown list
var stateChoiceBtn = document.querySelector('#stateBtn');
var selectedState = document.querySelector('#state-codes')

// Variables used to display data based on input request
var natParkEl = document.getElementById('natParkURL');

// Variables used to dynamically generate HTML elements to populate with fetch data
var urlList = document.getElementById('urlList');


// ------------------------ END OF VARIABLES -----------------------------


// ------------------------- START OF CODE -------------------------------


stateChoiceBtn.onclick = (event) => {
    event.preventDefault();
    urlList.textContent = '';   
    var stateCode = selectedState.value; 
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&api_key=' + authKey)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(stateCode);
            console.log(data.total);
            for (i = 0; i < data.total; i++) {
                console.log(data.data[i].url);
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = data.data[i].url;
                a.textContent = data.data[i].name;
                li.appendChild(a);
                urlList.appendChild(li);
            }
        })    
};

// Code for select
$(document).ready(function(){
    $('select').formSelect();
  });