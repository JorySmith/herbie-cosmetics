const shippingAlert = document.getElementById('alert');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;
const navbarCartIcon = document.querySelector('.fa-shopping-bag');
const shoppingCart = document.querySelector('.shopping-cart');
const closeCartDiv = document.querySelector('.close-cart-window');
const removeCartItemIcons = document.querySelectorAll('.fa-trash');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const completePurchase = document.getElementById('checkout-btn');

//event listener for click to remove free shipping alert banner
shippingAlert.addEventListener('click', () => {
  shippingAlert.classList.toggle('hidden');
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
  el.addEventListener('click', addClickedItemToCart));

//event listener for shopping cart 'checkout'
completePurchase.addEventListener('click', clearCartAfterPurchase);

updateTotalShoppingCartItems();
updateNavbarCartIconTotal();
updateShoppingCartTotal()


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

function updateNavbarCartIconTotal() {
  //update navbar shopping cart icon to reflect total items in shopping cart
  const totalCartItems = document.getElementById('total-cart-items');
  const updatedTotal = updateTotalShoppingCartItems().length.toString();

  //toggle hidden on cart icon total, avoid showing a zero
  //if cart is empty, when you add to cart, unhide icon
  if (updatedTotal == 0) {
    totalCartItems.classList.toggle('hidden');
    totalCartItems.innerText = updatedTotal
  } else {
    totalCartItems.innerText = updatedTotal;
  }
}

function updateTotalShoppingCartItems() {
  //get total number of items in the shopping cart  
  const totalShoppingCartItems = document.getElementsByClassName('shopping-cart-item');
  return totalShoppingCartItems
}

function addClickedItemToCart(event) {
  //update navbar cart icon and total cart items
  //get button clicked item name, image, and price
  //grab clicked item container/shopping-cart-item, query classes inside it
  //see if item is already in the cart, add reject message if so

  updateNavbarCartIconTotal()
  updateTotalShoppingCartItems()
  updateShoppingCartTotal()

  const clickedItemContainer = event.target.parentElement
  const itemImage = clickedItemContainer.getElementsByClassName('item-img')[0].src
  const itemName = clickedItemContainer.getElementsByClassName('item-name')[0].innerText
  const itemPrice = clickedItemContainer.getElementsByClassName('item-price')[0].innerText;

  //see if current items names in cart match clicked item name
  const currentCartItemNames = document.getElementsByClassName('cart-item-name');

  for (let i = 0; i < currentCartItemNames.length; i++) {
    if (currentCartItemNames[i].innerText.trim() == itemName) {
      alert("That item is already in your shopping cart");
      return
    }
  }
  addItemToCart(itemImage, itemName, itemPrice)

}

function addItemToCart(itemImage, itemName, itemPrice) {
  //create new cart item div to be added to the shopping cart
  //get shopping cart item div to append new cart item
  const newCartItemDiv = document.createElement('div');
  newCartItemDiv.classList.add('shopping-cart-item');
  document.getElementsByClassName('shopping-cart-items')[0].append(newCartItemDiv);
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
        <label for="qty"></label>
        <select class="qty" id="qty" name="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="1">5</option>
          <option value="2">6</option>
          <option value="3">7</option>
          <option value="4">8</option>
          <option value="3">9</option>
          <option value="4">10</option>
        </select>
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
  updateShoppingCartTotal()
  newCartItemDiv.getElementsByClassName('fa-trash')[0].addEventListener('click', removeShoppingCartItem);
}

function removeShoppingCartItem(event) {
  //determine which item was clicked, remove that item
  event.target.parentElement.parentElement.parentElement.remove();
  updateTotalShoppingCartItems();
  updateNavbarCartIconTotal();
  updateShoppingCartTotal()
  console.log()
}

function updateShoppingCartTotal() {
  //grab each item's price, sum it
  const cartItemPrices = document.getElementsByClassName('cart-item-price');
  let totalArray = [];
  for (let i = 0; i < cartItemPrices.length; i++) {
    totalArray.push(parseFloat(cartItemPrices[i].innerText.replace('$', '')));
  }
  const cartTotal = totalArray.reduce((sum, currentItem) => {
    return currentItem + sum;
  }, 0);

  // insert total into shopping cart total
  document.getElementById('cart-total-price').innerText = "$" + cartTotal;
}

function clearCartAfterPurchase() {
  //get all shopping cart items, remove them
  const currentItems = document.getElementsByClassName('shopping-cart-items')[0];

  if (updateTotalShoppingCartItems().length > 0) {
    alert('Thank you for your purchase!')
    while (currentItems.hasChildNodes()) {
      currentItems.removeChild(currentItems.firstChild)
    }
    updateNavbarCartIconTotal()
    updateShoppingCartTotal()
  } else {
    alert('Your shopping cart is empty. Please add items to the cart.')
  }
}