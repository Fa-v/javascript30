const secondsHand = document.querySelector('.seconds');
const minutesHand = document.querySelector('.minutes');
const hoursHand = document.querySelector('.hours');

function setDate() {
 const now = new Date();

 const seconds = now.getSeconds();
 const secondsDegrees = ((seconds / 60) * 360);
 secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
 //console.log(seconds);

 const minutes = now.getMinutes();
 const minutesDegrees = ((minutes / 60) * 360);
 minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

 const hours = now.getHours();
 const hoursDegrees = ((hours / 12) * 360);
 hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;

}

setInterval(setDate, 1000);

setDate();