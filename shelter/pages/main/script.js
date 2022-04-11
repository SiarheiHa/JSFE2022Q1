window.onload = function () {
  navigation.addEventListener("click", closeMenu);
  burger.addEventListener("click", toggleBurger);
  shadow.addEventListener("click", closeMenu);
};

const menu = document.querySelector(".header-navigation");
const burger = document.querySelector(".burger");
const navigation = document.querySelector(".header-navigation");
const shadow = document.querySelector(".shadow");

function toggleBurger() {
  burger.classList.toggle("burger_open");
  toggleMenu();
  toggleShadow();
}

function toggleMenu() {
  menu.classList.toggle("header-navigation_open");
}

function closeMenu(event) {
  if (
    event.target.classList.contains("nav-link") ||
    event.target.classList.contains("shadow")
  ) {
    menu.classList.remove("header-navigation_open");
    burger.classList.remove("burger_open");
    toggleShadow();
  }
}

function toggleShadow() {
  if (window.innerWidth < 768) {
    shadow.classList.toggle("shadow_active");
    scrollDesable();
  }
}

function scrollDesable() {
  if (shadow.classList.contains("shadow_active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
}
