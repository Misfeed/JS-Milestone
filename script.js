/*let myFirstname = 'Bezza';
let myLastname = 'Zelalem';
console.log(myFirstname , myLastname);*/

/*let myFirstname = 'Jose';
let myLastname = 'Rocha';
console.log(myFirstname , myLastname);*/

/*let myFirstname = 'Noah';
let myLastname = 'Berhanu';
console.log(myFirstname , myLastname);*/

/*let myFirstname = 'Daniella';
let myLastname = 'Echevestre';
console.log(myFirstname , myLastname);*/

function changeElementStyle() {
  var element = document.getElementById('id1');
  if (element) {
      // Toggle between black and white
      element.style.backgroundColor = (element.style.backgroundColor === 'black') ? 'white' : 'black';
      element.style.color = (element.style.color === 'black') ? 'white' : 'black';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('styleButton');
  if (button) {
      button.addEventListener('click', changeElementStyle);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  //Creating the following 3 variables to manipulate later
  const toggleButton = document.querySelector('.toggle-button');
  const navbarLinks = document.querySelectorAll('.navbar-links a');
  const toggleButtonSpan = document.querySelector('.navbar .toggle-button span');

  /*This will activate the function when the toggle button is clicked. It will iterate over every link in the navbar-links div*/
  toggleButton.addEventListener('click', function () {
    navbarLinks.forEach(function (link) {
      //Determines whether link has active class. If so, removes class. If not, adds class.
      link.classList.toggle('active');
    });

    //Adds class to body, toggle button, and toggle button contents
    document.body.classList.toggle('active');
    toggleButton.classList.toggle('active');
    toggleButtonSpan.classList.toggle('active');

   
    //Toggle the clicked class on each navbar link
    navbarLinks.forEach(function (link) {
      link.classList.remove('clicked');
    });

  });

    //Closes the toggle by removing active class
    if (document.body.classList.contains('active')) {
      document.body.classList.remove('active');
      toggleButton.classList.remove('active');
      toggleButtonSpan.classList.remove('active');
    }
});

