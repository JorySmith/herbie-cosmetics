const alert = document.getElementById('alert');

alert.addEventListener('click', toggleHidden);

function toggleHidden() {
  // toggle hidden 
  alert.classList.toggle('hidden');
}