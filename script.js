const alert = document.getElementById('alert');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;
const navbarCartIcon = document.querySelector('.fa-shopping-bag');
const shoppingCart = document.querySelector('.shopping-cart');
const closeCartDiv = document.querySelector('.close-cart-window');
const removeCartItemIcons = document.querySelectorAll('.fa-trash');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

//event listener for click to remove free shipping alert banner
alert.addEventListener('click', () => {
  alert.classList.toggle('hidden');
});

//create a sticky nav once the user starts to scroll down
window.onscroll = function () {
  stickyNav()
};

//event listener on navbar shopping cart icon click to show/hide cart
navbarCartIcon.addEventListener('click', toggleCart);

//event listener on shopping cart 'close' div to close it
closeCartDiv.addEventListener('click', toggleCart);

//event listeners on each cart item trash icons for removal
removeCartItemIcons.forEach(el =>
  el.addEventListener('click', removeShoppingCartItem));

//event listeners for 'add to cart' buttons
addToCartButtons.forEach(el =>
  el.addEventListener('click', itemClickedAddToCart));

updateNavbarCartIconTotal()
updateTotalShoppingCartItems()


function toggleCart() {
  shoppingCart.classList.toggle('hidden');
}

//close modal if a user clicks outside of the modal
window.onclick = function (event) {
  if (event.target == shoppingCart) {
    shoppingCart.classList.toggle('hidden');
  }
}

function stickyNav() {
  if (window.pageYOffset > sticky + 1) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
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

//add item to the shopping cart
function itemClickedAddToCart(event) {
  //see if item is already in the cart, add reject message
  //get item name, image, and price, add it to the shopping cart
  //easiest way is to grab item container first, the query inside it
  const itemContainer = event.target.parentElement
  //grab clicked item name, image, price
  const itemImage = itemContainer.getElementsByClassName('item-img')[0].src
  const itemName = itemContainer.getElementsByClassName('item-name')[0].innerText
  const itemPrice = itemContainer.getElementsByClassName('item-price')[0].innerText
  addItemToCart(itemImage, itemName, itemPrice)

}

function addItemToCart(itemImage, itemName, itemPrice) {
  //add clicked item to shopping cart  
  //create new cart item div to be added to the shopping cart
  //get shopping cart item div to append new cart item
  const newCartItemDiv = document.createElement('div')
  newCartItemDiv.classList.add('shopping-cart-item')
  // console.log(itemImage, itemName, ItemPrice)  
  const currentItems = document.getElementsByClassName('rewards-cartItems-wrapper')[0].append(newCartItemDiv)
  const testDiv = `    
  <div class="cart-item-img">
    <img class="cart-item-img" src="${itemImage}">
  </div>
  <p class="cart-item-name">
  ${itemName}
  </p>
  <div class="qty-price-remove-container">
    <div class="cart-item-qty-container">
      <p class="cart-item-qty">Qty</p>
      <div class="qty-selector">
        <p>1 <span class="qty-arrow">&#9660</span></p>
      </div>
    </div>
    <div class="cart-item-price-container">
      <p>Price</p>
      <p class="cart-item-price">${itemPrice}</p>
    </div>
    <div class="cart-item-remove">
      <i class="fas fa-trash"></i>
    </div>
  </div>`
  newCartItemDiv.innerHTML = testDiv
  updateTotalShoppingCartItems();
  updateNavbarCartIconTotal();
  newCartItemDiv.getElementsByClassName('fa-trash')[0].addEventListener('click', removeShoppingCartItem);
}

