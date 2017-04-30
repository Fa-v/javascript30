const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
      console.log(localMediaStream);
    })
  .catch(error => console.error(`Oh, no!!! give access to your webcam please`, error))
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    /* take pixels out */
    let pixels = ctx.getImageData(0, 0, width, height);

   /* pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.5;*/

    pixels = greenScreen(pixels);    
    /* mess with them */
    // pixels = redEffect(pixels);
    /* put them back */
    ctx.putImageData(pixels, 0, 0);
   /* console.log(pixels);
    debugger;*/

  }, 16);
}

function takePhoto() {
  //play the sound
  snap.currentTime = 0;
  snap.play();

  //take the data out of canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="me me me" />`
  strip.insertBefore(link, strip.firstChild);
  // console.log(data);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //G
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //R
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //B
  }
  return pixels;
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //Red
    pixels.data[i + 500] = pixels.data[i + 1]; //Green
    pixels.data[i - 550] = pixels.data[i + 2]; //Blue
  }
  return pixels;
}

function greenScreen(pixels) {
   const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();




video.addEventListener('canplay', paintToCanvas)