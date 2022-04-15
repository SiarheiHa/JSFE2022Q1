window.onload = function() {  
navigation.addEventListener("click", closeMenu);
burger.addEventListener("click", toggleBurger);
}

const menu = document.querySelector(".header-navigation");
const burger = document.querySelector(".burger");
const navigation = document.querySelector(".header-navigation");
const shadow = document.querySelector(".shadow")

function toggleBurger() {
  burger.classList.toggle("burger_open");
  toggleMenu();
  toggleShadow()
}

function toggleMenu() {
  menu.classList.toggle("header-navigation_open");
}

function closeMenu(event) {
  if (event.target.classList.contains("nav-link")) {
    menu.classList.remove("header-navigation_open");
    burger.classList.remove("burger_open")
    toggleShadow()
  }
}

function toggleShadow() {
  shadow.classList.toggle("shadow_active")
}