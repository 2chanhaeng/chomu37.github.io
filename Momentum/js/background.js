const imagesLength = 10;
const chosenImagesIndex = Math.floor(Math.random() * imagesLength);

document.body.style.backgroundImage = `url("img/bgimg_${chosenImagesIndex}.jpg")`;