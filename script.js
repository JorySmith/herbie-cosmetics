const alert = document.getElementById('alert');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;





//click to remove free shipping alert banner
alert.addEventListener('click', toggleHidden);

//create a sticky nav once the user starts to scroll down
window.onscroll = function () {
  stickyNav()
};

updateNavbarCartIconTotal()
//update navbar shopping cart icon to reflect total items in shopping cart 
function updateNavbarCartIconTotal() {
  const totalCartItems = document.getElementById('total-cart-items');
  const updatedTotal = updateTotalShoppingCartItems().length.toString();
  console.log(updatedTotal);
  totalCartItems.innerText = updatedTotal;
}

updateTotalShoppingCartItems()
//get total number of items in the shopping cart
function updateTotalShoppingCartItems() {
  const totalShoppingCartItems = document.getElementsByClassName('shopping-cart-item');
  return totalShoppingCartItems
}







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