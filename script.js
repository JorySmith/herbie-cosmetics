const alert = document.getElementById('alert');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;
const navbarCartIcon = document.querySelector('.fa-shopping-bag');
const shoppingCart = document.querySelector('.shopping-cart-container');
const closeCartDiv = document.querySelector('.close-cart-window');
const removeCartItemIcons = document.querySelectorAll('.fa-trash');

//event listener for click to remove free shipping alert banner
alert.addEventListener('click', () => {
  alert.classList.toggle('hidden');
});

//create a sticky nav once the user starts to scroll down
window.onscroll = function () {
  stickyNav()
};

//event listener on navbar shopping cart icon click to show/hide cart
navbarCartIcon.addEventListener('click', closeCart);

//event listener on shopping cart close div to close it
closeCartDiv.addEventListener('click', closeCart);

//event listeners for click for each remove cart item trash icons
removeCartItemIcons.forEach(el =>
  el.addEventListener('click', removeShoppingCartItem));

updateNavbarCartIconTotal()
updateTotalShoppingCartItems()

function closeCart() {
  shoppingCart.classList.toggle('hidden');
}

function stickyNav() {
  if (window.pageYOffset > sticky + 1) {
    navbar.classList.add("sticky");
    shoppingCart.classList.add("sticky");
    shoppingCart.style.margin = "3.25rem 0 2rem"
  } else {
    navbar.classList.remove("sticky");
    shoppingCart.classList.remove("sticky");
  }
}

//update navbar shopping cart icon to reflect total items in shopping cart 
function updateNavbarCartIconTotal() {
  const totalCartItems = document.getElementById('total-cart-items');
  const updatedTotal = updateTotalShoppingCartItems().length.toString();
  if (updatedTotal == 0) {
    //toggle hidden on cart icon total, avoid showing a zero
    totalCartItems.classList.toggle('hidden');
  } else {
    totalCartItems.innerText = updatedTotal;
  }
}

//get total number of items in the shopping cart
function updateTotalShoppingCartItems() {
  const totalShoppingCartItems = document.getElementsByClassName('shopping-cart-item');
  return totalShoppingCartItems
}

//remove an item from the shopping cart
function removeShoppingCartItem(event) {
  //determine which item was clicked, remove that item
  event.target.parentElement.parentElement.parentElement.remove();
  updateTotalShoppingCartItems();
  updateNavbarCartIconTotal();
}
