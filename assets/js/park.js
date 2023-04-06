// ~~~~~~~~~~~~~~~~~~~~~ START OF CODE USED FOR THE PARKS.HTML PAGE ~~~~~~~~~~~~~~~~~~~~~~~

// --------------------- START OF NATIONAL PARKS SERVICES API CODE --------------------------

// Variables used for fetch request
var authKey = "hZTRWNMJEAweO66zqYvfTWY1QIH0517Azwjbs1VH";

// Variables to store user input of dropdown list
var stateChoiceBtn = document.querySelector('#stateBtn');
var selectedState = document.querySelector('#state-codes')

// Variables used to display data based on input request
var natParkEl = document.getElementById('natParkURL');

// Variables used to dynamically generate HTML elements to populate with fetch data
var urlList = document.getElementById('urlList');

// Takes the user input from the state dropdown list, and begins a function to load national parks in or around that state.
stateChoiceBtn.onclick = (event) => {
    // Lines 25-27: Sets up a default state for the page to load in, which will be filled as the function runs
    event.preventDefault(); 
    urlList.textContent = '';   
    var stateCode = selectedState.value; 
    // Begins a 'fetch' request for the National Parks Service API, specifically pulling information on parks and their home webpages for the selected state
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&api_key=' + authKey)
        .then(response => response.json())
        .then(data => {
            // Lines 33-35: Used for testing purposes to allow proper data selection based on fetched data
            console.log(data);
            console.log(stateCode);
            console.log(data.total);
            // Lines 37-45: Dynamically generate text content and corresponding links which will populate a list based on the search parameters.
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