import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  profileJob,
  profileName,
  initializeCards,
  configObjects,
  profileEditModal,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  elementAddModal,
  elementAddButton,
  elementAddForm,
  elementList,
  elNameInput,
  elUrlInput,
  elementImageModal,
  cardSelector,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

document.addEventListener("DOMContentLoaded", () => {
  const cardFormValidator = new FormValidator(configObjects, elementAddForm);
  const profileFormValidator = new FormValidator(
    configObjects,
    profileEditForm
  );

  const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    handleProfileFormSubmit
  );

  const addNewCardPopup = new PopupWithForm(
    "#element-add-modal",
    handleNewCardSubmit
  );

  const cardImagePopup = new PopupWithImage("#element-image-modal");

  const section = new Section(
    {
      items: initializeCards,
      renderer: (cardData) => {
        const cardElement = renderCard(cardData);
        section.addItem(cardElement);
      },
    },
    elementList
  );

  const userInfo = new UserInfo(profileName, profileJob);

  section.renderItems();

  function handleProfileFormSubmit(profileValues) {
    const { name, job } = profileValues;

    userInfo.setUserInfo({
      name: name,
      job: job,
    });

    profileEditPopup.close();
  }

  function handleNewCardSubmit(cardValues) {
    const { title, url } = cardValues;
    const newElementData = renderCard({ name: title, url: url });
    section.addItem(newElementData);
    addNewCardPopup.close();
    cardFormValidator.disableButton();
  }

  function handleCardImageClick(caption, imageUrl) {
    cardImagePopup.open(caption, imageUrl);
  }

  function renderCard(cardData) {
    return new Card(
      cardData,
      "#element-template",
      handleCardImageClick
    ).generateCard();
  }

  profileEditButton.addEventListener("click", () => {
    const { name, job } = userInfo.getUserInfo();

    profileTitleInput.value = name;
    profileDescriptionInput.value = job;

    profileEditPopup.open();
    profileFormValidator.resetValidation();
  });

  elementAddButton.addEventListener("click", () => {
    addNewCardPopup.open();
  });

  profileFormValidator.enableValidation();
  cardFormValidator.enableValidation();

  profileEditPopup.setEventListeners();
  cardImagePopup.setEventListeners();
  addNewCardPopup.setEventListeners();
});