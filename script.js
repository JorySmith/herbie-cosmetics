const alert = document.getElementById('alert');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;

alert.addEventListener('click', toggleHidden);

window.onscroll = function () {
  stickyNav()
};

function toggleHidden() {
  alert.classList.toggle('hidden');
}

function stickyNav() {
  if (window.pageYOffset > sticky + 1) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}