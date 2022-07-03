const data = [
  {
    name: "Jennifer",
    img: "../../assets/images/png/pets-jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Sophia",
    img: "../../assets/images/png/pets-sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Woody",
    img: "../../assets/images/png/pets-woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
  },
  {
    name: "Scarlett",
    img: "../../assets/images/png/pets-scarlet.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Katrine",
    img: "../../assets/images/png/pets-katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Timmy",
    img: "../../assets/images/png/pets-timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"],
  },
  {
    name: "Freddie",
    img: "../../assets/images/png/pets-freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Charly",
    img: "../../assets/images/png/pets-charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
  },
];

class PetCard {
  constructor({
    name,
    img,
    ...rest
    // type,
    // breed,
    // description,
    // age,
    // inoculations,
    // diseases,
    // parasites
  }) {
    this.name = name;
    this.img = img;
  }

  //// Card generator
  generateCard() {
    let template = "";
    let card = document.createElement("div");
    card.className = "pet";
    card.setAttribute("data-name", this.name);

    template += `<div class="pet__photo">
                <img src=${this.img} alt=${this.name} class="pet__img">
                </div>
                <p class="pet__name">${this.name}</p>
                <button class="button button_secondary">Learn more</button>
                `;
    card.innerHTML = template;
    return card;
  }
}

class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = "";
    this.modalContent = "";
    this.modalCloseBtn = "";
    this.overlay = "";
  }

  buildModal(content) {
    //Overlay
    this.overlay = this.createDomNode(this.overlay, "div", "modal-wrapper");
    //Modal
    this.modal = this.createDomNode(this.modal, "div", "modal", this.classes);
    //Modal content
    this.modalContent = this.createDomNode(
      this.modalContent,
      "div",
      "modal-content"
    );
    //Close button
    this.modalCloseBtn = this.createDomNode(
      this.modalCloseBtn,
      "div",
      "modal__btn"
    );
    this.modalCloseBtn.innerHTML = "&#215;";

    this.setContent(content);

    this.appendModalElements();

    // console.log(this.overlay)

    // Bind Events
    this.bindEvents();

    ///open Modal
    this.openModal();
  }

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    this.modalContent.append(content);
  }

  appendModalElements() {
    this.modal.append(this.modalCloseBtn);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  // Bind Events
  bindEvents() {
    this.modalCloseBtn.addEventListener("click", this.closeModal);
    this.overlay.addEventListener("click", this.closeModal);
  }

  //Open
  openModal() {
    document.body.append(this.overlay);
    scrollDesable();
  }

  closeModal(e) {
    let classes = e.target.classList;
    if (classes.contains("modal-wrapper") || classes.contains("modal__btn")) {
      // проверка на лишнее срабатывание
      if (document.querySelector(".modal-wrapper")) {
        document.querySelector(".modal-wrapper").remove();
        scrollDesable();
      }
    }
  }
}

class PetModal extends Modal {
  constructor(
    classes,
    {
      name,
      img,
      type,
      breed,
      description,
      age,
      inoculations,
      diseases,
      parasites,
    }
  ) {
    super(classes);
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }
  generateContent() {
    let template = "";
    let card = document.createElement("div");
    card.className = "pet-modal-content";

    template += `
    <div class="modal-image">
        <img class = "modal__img" src=${this.img}>
    </div>
    <div class="modal__content">
        <h3 class="title title_modal">${this.name}</h3>
        <h4 class="modal__subtitLe">${this.type} - ${this.breed}</h4>
        <p class="modal__text">${this.description}</p>
        <ul class="modal__list">
            <li class="modal__list__item">
                <span class="bold__text">Age: </span>${this.age}
            </li>
            <li class="modal__list__item">
                <span class="bold__text">Inoculations: </span>${this.inoculations}
            </li>
            <li class="modal__list__item">
                <span class="bold__text">Diseases: </span>${this.diseases}
            </li>
            <li class="modal__list__item">
                <span class="bold__text">Parasites: </span>${this.parasites}
            </li>
        </ul>
    </div>
`;
    card.innerHTML = template;
    // console.log(card)
    return card;
  }
  renderModal() {
    let content = this.generateContent();
    super.buildModal(content);
  }
}

window.onload = function () {
  navigation.addEventListener("click", closeMenu);
  burger.addEventListener("click", toggleBurger);
  shadow.addEventListener("click", closeMenu);
  sliderClickHandler();
  renderCenterPetCardsToDom();
  renderNextPetCardsToDom();

  ///Generate Base Modal from Modal Class
  // addLogoClickHandler();
};

/// Burger and menu *******************************************************
const menu = document.querySelector(".header-navigation");
const burger = document.querySelector(".burger");
const navigation = document.querySelector(".header-navigation");
const shadow = document.querySelector(".shadow");
const logo = document.querySelector(".logo");

function toggleBurger() {
  burger.classList.toggle("burger_open");
  toggleMenu();
  toggleShadow();
  hideLogo();
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
    hideLogo();
  }
}

function toggleShadow() {
  if (window.innerWidth < 768) {
    shadow.classList.toggle("shadow_active");
    scrollDesable();
  }
}

function scrollDesable() {
  if (
    shadow.classList.contains("shadow_active") ||
    document.querySelector(".modal-wrapper")
  ) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
}

function hideLogo() {
  if (window.innerWidth < 768) {
    logo.classList.toggle("hidden");
  }  
}

/// Slider
// const sliderClickHandler = () => {
//   const slider = document.querySelector(".slider");
//   slider.addEventListener("click", (e) => {
//     // console.log('test')
//     let clickedItem = e.target;
//     // console.log(clickedItem)
//     if (clickedItem.classList.contains("slider__button")) {
//       scrollSlider(clickedItem);
//     }
//   });
// };

// let sliderOffset = 0;
// const scrollSlider = (button) => {
//   let step = 1080; // width slider-item
//   const sliderItems = document.querySelector(".slider-items");
//   button.classList.contains("slider__button_right")
//     ? (sliderOffset -= step)
//     : (sliderOffset += step);

//   if (sliderOffset <= -3240) {
//     sliderOffset = 0;
//   } else if (sliderOffset > 0) {
//     sliderOffset = -2160;
//   }

//   sliderItems.style.left = `${sliderOffset}px`;
// };

///Pet render

//рендер в центр
const activeSlideBlock = document.querySelectorAll(".slider-items")[1];

const renderCenterPetCardsToDom = () => {
  const cardContainer = getCenterCardContainer();
  const randomData = getRandomDataArray();
  generatePetCards(randomData).forEach((card) => {
    cardContainer.append(card.generateCard());
  });
  addPetsCardsClickHandler();
};

const getCenterCardContainer = () => {
  const container = activeSlideBlock;
  container.innerHTML = "";
  return container;
};

// рендер скрытых слайдов справа и слева
const prevSlideBlock = document.querySelector(
  ".slider-items-wrapper"
).firstElementChild;
const nextSlideBlock = document.querySelector(
  ".slider-items-wrapper"
).lastElementChild;

const renderNextPetCardsToDom = () => {
  const cardContainers = getCardContainers();
  const randomData = getRandomDataArray();
  cardContainers.forEach((cardContainer) => {
    generatePetCards(randomData).forEach((card) => {
      cardContainer.append(card.generateCard());
    });
  });
  addPetsCardsClickHandler();
};

const getCardContainers = () => {
  const containers = [prevSlideBlock, nextSlideBlock];
  containers.forEach((container) => (container.innerHTML = ""));
  return containers;
};

/// общие функции для рендера в слайдер
const generatePetCards = (data) => {
  let cards = [];
  data.forEach((card) => {
    cards.push(new PetCard(card));
  });
  return cards;
};

/// Modal Window******************************************
// const addLogoClickHandler = () => {
//   document.querySelector(".logo").addEventListener("click", () => {
//     generateLogoModal();
//   });
// };

// const generateLogoModal = () => {
//   renderModalWindow("Test content");
// };

// const renderModalWindow = (content) => {
//   let modal = new Modal("logo-modal");
//   modal.buildModal(content);
// };

const addPetsCardsClickHandler = () => {
  activeSlideBlock.addEventListener("click", (e) => {
    if (e.target.closest(".pet")) {
      let clickedPetName = e.target.closest(".pet").getAttribute("data-name");
      let clickedPetData = getClickedData(clickedPetName);
      // console.log('clickedPetName')
      renderPetModalWindow(clickedPetData);
      // console.log(clickedPetName)
    }
  });
};

const getClickedData = (clickedPetName) => {
  return data.find((pet) => pet.name === clickedPetName);
};

const renderPetModalWindow = (clickedPetData) => {
  ////блокировка повторного открытия окна
  if (document.querySelector(".modal-wrapper")) {
    return;
  }
  let modal = new PetModal("pet-modal", clickedPetData);
  modal.renderModal();
};

/// Random Pet Card

const countElements = 3;

let previosArrayOfNumbers = [0, 1, 2];

const randomInteger = () => {
  const rand = Math.random() * 8;
  return Math.floor(rand);
};

const getRandomArrayOfNumbers = () => {
  const randomArrayOfNumbers = [];

  while (randomArrayOfNumbers.length < countElements) {
    let randomNumber = randomInteger();
    if (!randomArrayOfNumbers.includes(randomNumber)) {
      randomArrayOfNumbers.push(randomNumber);
    }
  }
  return randomArrayOfNumbers;
};

const getCurrentArrayOfNumbers = () => {
  let currentArrayOfNumbers = getRandomArrayOfNumbers();
  while (
    [...new Set(previosArrayOfNumbers.concat(currentArrayOfNumbers))].length !==
    2 * countElements
  ) {
    currentArrayOfNumbers = getRandomArrayOfNumbers();
  }
  previosArrayOfNumbers = currentArrayOfNumbers;
  return currentArrayOfNumbers;
};

const getRandomDataArray = () => {
  let currentArrayOfNumbers = getCurrentArrayOfNumbers();
  const randomDataArray = [];
  currentArrayOfNumbers.forEach((i) => randomDataArray.push(data[i]));
  return randomDataArray;
};

/// new Random Slider
const carousel = document.querySelector(".slider-items-wrapper");

const sliderClickHandler = () => {
  const slider = document.querySelector(".slider");
  slider.addEventListener("click", (e) => {
    let clickedItem = e.target;
    if (clickedItem.classList.contains("slider__button_right")) {
      carousel.classList.add("transition-right");
    } else if (clickedItem.classList.contains("slider__button_left")) {
      carousel.classList.add("transition-left");
    }
  });
};

const changeSliderContent = () => {
  activeSlideBlock.innerHTML = prevSlideBlock.innerHTML
  renderNextPetCardsToDom()
}


carousel.addEventListener("animationend", () => {
  carousel.classList.remove("transition-right");
  carousel.classList.remove("transition-left");
  changeSliderContent()
});
