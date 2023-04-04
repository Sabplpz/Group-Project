// Code for API Call to Nasa API for the APOD

var APINasaKey = "BUbRCyc8uvOZ8RtdcBeAPgg8PSc8i953gclSIsdR";
var nasaCall = "https://api.nasa.gov/planetary/apod?api_key=" + APINasaKey + "&count=5";
var apodEl = document.querySelector('#apod');

function displayApodImage(data) {

    var apodImg = data[0].hdurl;
    var imageEl = document.createElement('img');
    imageEl.src = apodImg;
    apodEl.appendChild(imageEl);

    var imgTitle = data[0].title;
    var titleEl = document.createElement('h4');
    titleEl.textContent = imgTitle;
    apodEl.appendChild(titleEl);

    var description = data[0].explanation;
    var descEl = document.createElement('p');
    descEl.textContent = description;
    apodEl.appendChild(descEl);

}

fetch(nasaCall)
.then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayApodImage(data);
      });
    }
  });
