const alert = document.getElementById('alert');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;

window.onscroll = function () {
  stickyNav()
};

alert.addEventListener('click', toggleHidden);

function toggleHidden() {
  // toggle hidden 
  alert.classList.toggle('hidden');
}

function stickyNav() {
  if (window.pageYOffset > sticky + 1) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}