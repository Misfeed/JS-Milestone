//List of stories
const imageList = [
  { src: "https://m.media-amazon.com/images/I/91XHDtSt7qL._AC_UF1000,1000_QL80_.jpg" },
  { src: "https://i.ebayimg.com/images/g/e8IAAASOSwxRFlrgM5/s-l1600.jpg" },
  { src: "https://m.media-amazon.com/images/I/71HSYFTuBxL._AC_UF1000,1000_QL80_.jpg" },
  { src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Scooby_doo_mystery_incorporated_poster.jpg/220px-Scooby_doo_mystery_incorporated_poster.jpg" },
  { src: "https://m.media-amazon.com/images/I/7131tdHD1UL._SY425_.jpg" },
  { src: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/IOWYN4RAENBOFJKEGHSQJ57PG4.jpg&w=1200" },
  { src: "https://www.rd.com/wp-content/uploads/2021/11/The-Bullet-That-Missed-A-Thursday-Murder-Club-Mystery-ecomm-amazon.com_.jpg?fit=700,700" },
  { src: "https://img.secondsale.com/PRO08331858.jpg?d=255x386" },
  { src: "https://sarahjmaas.com/wp-content/uploads/2023/11/9781635577020_min.jpg" },
  { src: "https://sarahjmaas.com/wp-content/uploads/2023/11/2_HOSAB_min.jpg" }, 
  { src: "https://sarahjmaas.com/wp-content/uploads/2023/11/9781635574104_min.jpg" },
  { src: "https://thebookcoverdesigner.com/wp-content/uploads/2023/02/the-cursed-doll.jpg" }, 
  { src: "https://images.penguinrandomhouse.com/cover/9781368076067" }, 
  { src: "https://pics.craiyon.com/2023-09-12/c3134512c003463faf2348d9cfd312c2.webp" }, 
  { src: "https://embed.cdn.pais.scholastic.com/v1/channels/tso/products/identifiers/isbn/9781338506518/primary/renditions/700" }
];

//Function to update the timer
function updateTimer() {
  const now = new Date();
  //Calculate days till Monday
  const daysUntilMonday = (1 + 6 - now.getDay()) % 7;
  const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday + 1, 0, 0, 0); 
  //Adjust till Monday at 12:00 am
  const timeUntilMonday = nextMonday - now;

  //Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeUntilMonday / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilMonday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntilMonday % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeUntilMonday % (1000 * 60)) / 1000);

  //Display the timer
  document.getElementById('timer').innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;

  //If Monday, change the image and reset the timer
  if (now.getDay() === 1) {
    changeImage();
    //Restart the timer after 1 second
    setTimeout(updateTimer, 1000); 
  } else {
    //Continue updating the timer every second
    setTimeout(updateTimer, 1000); 
  }
}

//Function to change the image randomly, considering the last chosen image and week
function changeImage() {
  const lastChosenInfo = JSON.parse(localStorage.getItem('lastChosenInfo')) || {};
  const currentWeek = getCurrentWeek();

  //Make sure at least one week has passed since the last chosen image
  if (!lastChosenInfo.week || lastChosenInfo.week !== currentWeek) {
    const availableImages = imageList.filter(img => img.src !== lastChosenInfo.src);
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const randomImage = availableImages[randomIndex];

    //Update the last chosen image and week in localStorage
    localStorage.setItem('lastChosenInfo', JSON.stringify({
      src: randomImage.src,
      week: currentWeek
    }));

    document.getElementById('changingImage').src = randomImage.src;
  } else {
    //If not enough time has passed, choose the last chosen image
    document.getElementById('changingImage').src = lastChosenInfo.src;
  }
}


//Function to get the current week
function getCurrentWeek() {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1, 0, 0, 0);
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((now - startOfWeek) / millisecondsInWeek);
}


//Check if there is a countdown in progress in localStorage
const countdownInfo = JSON.parse(localStorage.getItem('countdownInfo'));
if (countdownInfo) {
//If a countdown is in progress, resume it
updateTimer();
} else {
//If no countdown in progress, start a new one
updateTimer();
}

//Save the countdown information in localStorage
window.addEventListener('beforeunload', () => {
const seconds = parseInt(document.getElementById('timer').innerText.split(': ')[1], 10);
localStorage.setItem('countdownInfo', JSON.stringify({ seconds }));

//Save the image information in localStorage
const lastChosenInfo = JSON.parse(localStorage.getItem('lastChosenInfo'));
if (lastChosenInfo) {
document.getElementById('changingImage').src = lastChosenInfo.src;
}
});
