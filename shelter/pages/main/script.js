const data = [
  {
    "name": "Jennifer",
    "img": "../../assets/images/jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "../../assets/images/scarlett.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "../../assets/images/katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "../../assets/images/timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "../../assets/images/freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "../../assets/images/charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
]

window.onload = function () {
  navigation.addEventListener("click", closeMenu);
  burger.addEventListener("click", toggleBurger);
  shadow.addEventListener("click", closeMenu);
  sliderClickHandler();
};

/// Burger und menu
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

/// Slider
const sliderClickHandler = () => {
  const slider = document.querySelector(".slider");
  slider.addEventListener("click", (e) => {
    // console.log('test')
    let clickedItem = e.target;
    // console.log(clickedItem)
    if (clickedItem.classList.contains("slider__button")) {
      scrollSlider(clickedItem);
    }
  });
};

let sliderOffset = 0;
const scrollSlider = (button) => {
  let step = 1080; // width slider-item
  const sliderItems = document.querySelector(".slider-items");
  button.classList.contains("slider__button_right")
    ? (sliderOffset -= step)
    : (sliderOffset += step);

  if (sliderOffset <= -3240) {
    sliderOffset = 0;
  }
      else if (sliderOffset > 0) {
    sliderOffset = -2160
  }

  sliderItems.style.left = `${sliderOffset}px`;
};
