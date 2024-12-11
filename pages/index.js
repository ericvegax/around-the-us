import Card from "../components/Card.js";
import FormValidator, { configurationObjects } from "../components/FormValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial cards array
  const initializeCards = [
    {
      name: "Yosemite Valley",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

  // Element selectors
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileTitleInput = document.querySelector("#title-input");
  const profileDescriptionInput = document.querySelector("#profile-input");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__descr");
  const profileEditForm = profileEditModal.querySelector("#profile-edit-form");

  const elementAddModal = document.querySelector("#element-add-modal");
  const elementAddButton = document.querySelector(".profile__add-button");
  const elementAddForm = elementAddModal.querySelector("#element-add-form");

  const elementList = document.querySelector(".elements__list");
  const elNameInput = elementAddModal.querySelector("#element-input");
  const elUrlInput = elementAddModal.querySelector("#image-input");

  const elementImageModal = document.querySelector("#element-image-modal");
  const modalImage = document.querySelector("#element-modal-image");
  const modalCaption = document.querySelector("#element-modal-caption");

  // Helper functions
  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keyup", handleEscKey);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keyup", handleEscKey);
  }

  function handleEscKey(evt) {
    if (evt.key === "Escape") {
      const activeModal = document.querySelector(".modal_opened");
      closeModal(activeModal);
    }
  }

  function handlePopupClose(evt) {
    if (evt.target.classList.contains("modal") || evt.target.classList.contains("modal__close")) {
      closeModal(evt.currentTarget);
    }
  }

  // Card settings
  const cardSelector = "#element-template";

  function handleImageClick(name, url) {
    modalImage.src = url;
    modalImage.alt = name;
    modalCaption.textContent = name;
    openModal(elementImageModal);
  }

  // Render initial cards
  initializeCards.forEach((cardData) => {
    const card = new Card(cardData, cardSelector, handleImageClick);
    elementList.append(card.generateCard());
  });

  // Event listeners
  elementAddButton.addEventListener("click", () => openModal(elementAddModal));
  profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
  });

  profileEditForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
  });

  elementAddForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newData = { name: elNameInput.value, url: elUrlInput.value };
    const card = new Card(newData, cardSelector, handleImageClick);
    elementList.append(card.generateCard());
    closeModal(elementAddModal);
    elementAddForm.reset();
  });

  // Form validation
  const cardFormElement = document.querySelector("#element-add-form");
  if (cardFormElement) {
    const cardFormValidator = new FormValidator(configurationObjects, cardFormElement);
    cardFormValidator.enableValidation();
  }
});
