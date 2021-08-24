// DOM Variables declared
const photoTitle = document.getElementById("photo-title");
const photoDate = document.getElementById("photo-date");
const image = document.getElementById("image");
const imageHd = document.getElementById("hd-image");
const aboutImage = document.getElementById("about-image");
const photoCopyright = document.getElementById("photo-copyright");
const randomImgBtn = document.getElementById("random-img-btn");
const todaysImgBtn = document.getElementById("todays-img-btn");

const container = document.querySelector(".container");
const toggleMenu = document.querySelector(".image-container");

// Variables for API to DOM
let apiPhotos = [];
let randomImageActive = false;
let apiUrl = "";

// Input Photo into Html
function todaysPhoto() {
  photoTitle.textContent = apiPhotos.title;
  photoDate.textContent = apiPhotos.date;
  if (!apiPhotos.copyright) {
    photoCopyright.textContent = " ";
  } else {
    photoCopyright.textContent = "Image Copyright: " + apiPhotos.copyright;
  }

  image.src = apiPhotos.url;
  imageHd.src = apiPhotos.url;
  if (apiPhotos.explanation.length > 600) {
    aboutImage.classList.add("long-explanation");
  } else {
    aboutImage.classList.remove("long-explanation");
  }
  aboutImage.textContent = apiPhotos.explanation;
}

// Get Photo from Api
async function getPhoto() {
  if (!randomImageActive) {
    apiUrl =
      "https://api.nasa.gov/planetary/apod?api_key=NJVoyA6REAldr8YHBeu9XcvxfKaDykOq9hLx8YHU";
  } else {
    apiUrl =
      "https://api.nasa.gov/planetary/apod?api_key=NJVoyA6REAldr8YHBeu9XcvxfKaDykOq9hLx8YHU&count=1";
  }

  try {
    const response = await fetch(apiUrl);
    apiPhotos = await response.json();
    if (randomImageActive) {
      apiPhotos = apiPhotos[0];
    }
    todaysPhoto();
  } catch (error) {
    //Catch Error Here
  }
}

getPhoto();

// Event Listeners
document.querySelector(".menu-container").addEventListener("click", () => {
  document.querySelector(".image-container").classList.toggle("toggle-menu");
});

// container.addEventListener("click", () => {
//   if (toggleMenu.classList.contains("toggle-menu")) {
//     toggleMenu.classList.remove("toggle-menu");
//   }
// });

document.querySelector(".image").addEventListener("click", () => {
  document.querySelector(".popup-image").classList.toggle("toggle-hd");
});

document.querySelector(".hd-image").addEventListener("click", () => {
  document.querySelector(".popup-image").classList.toggle("toggle-hd");
});

randomImgBtn.addEventListener("click", () => {
  document.querySelector(".button-container").classList.add("btn-visible");
  randomImageActive = true;
  getPhoto();
});

todaysImgBtn.addEventListener("click", () => {
  document.querySelector(".button-container").classList.remove("btn-visible");
  randomImageActive = false;
  getPhoto();
});
