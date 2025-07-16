import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  profileAbout,
  profileName,
  initializeCards,
  formValidatorConfig,
  profileEditModal,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  newCardModal,
  elementAddButton,
  elementCloseButton,
  profileCloseButton,
  elementAddForm,
  elementList,
  elNameInput,
  elUrlInput,
  elementImageModal,
  cardSelector,
  profileAvatar,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { Api } from "../utils/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    authorization: "36c19769-2369-480e-9e47-1ebd87ef991a",
  });

  const popupImage = new PopupWithImage("#element-image-modal");

  const newCardFormValidator = new FormValidator(
    formValidatorConfig,
    newCardModal
  );

  const profileFormValidator = new FormValidator(
    formValidatorConfig,
    profileEditModal
  );

  let cardList;

  function handlePicturePopup(name, link) {
    popupImage.open(name, link);
  }

  function createCard(cardData) {
    const card = new Card(
      cardData,
      "#element-template",
      handlePicturePopup,
      () => {
        api
          .deleteCard(cardData._id)
          .then(() => card.removeCard())
          .catch((error) => console.error(`Error deleting card: ${error}`));
      },
      handleLikeButton
    );

    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }

  function handleLikeButton(cardId) {
    if (this.isLiked()) {
      api
        .dislikeCard(cardId)
        .then((res) => this.setIsLiked(res.isLiked))
        .catch((error) => console.error(error));
    } else {
      api
        .likeCard(cardId)
        .then((res) => this.setIsLiked(res.isLiked))
        .catch((error) => console.error(error));
    }
  }

  const popupNewCard = new PopupWithForm(
    "#element-add-modal",
    handleNewCardSubmit
  );

  function handleNewCardSubmit(cardData) {
    api
      .createCard(cardData)
      .then((res) => {
        createCard(res);
        popupNewCard.resetForm();
        popupNewCard.close();
        newCardFormValidator.disableButton();
      })
      .catch((error) => console.error(`Error creating a new card: ${error}`));
  }

  const userInfo = new UserInfo({
    nameElement: ".profile__title",
    aboutElement: ".profile__descr",
    avatarElement: ".profile__img",
  });

  const popupEditProfile = new PopupWithForm(
    "#profile-edit-modal",
    handleProfileFormSubmit
  );

  function handleProfileFormSubmit(userData) {
    api
      .updateUserInfo(userData)
      .then((res) => {
        userInfo.setUserInfo(res);
        userInfo.setUserAvatar(res);
        popupEditProfile.close();
      })
      .catch((error) => console.error(`Error updating user info: ${error}`));
  }

  elementAddButton.addEventListener("click", () => {
    popupNewCard.open();
    newCardFormValidator.resetValidation();
  });

  elementCloseButton.addEventListener("click", () => popupNewCard.close());

  elementAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elNameInput.value;
    const link = elUrlInput.value;
    handleNewCardSubmit({ name, link });
  });

  profileEditButton.addEventListener("click", () => {
    popupEditProfile.open();
    profileFormValidator.resetValidation();
  });

  profileCloseButton.addEventListener("click", () => popupEditProfile.close());

  profileEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = profileTitleInput.value;
    const about = profileDescriptionInput.value;
    handleProfileFormSubmit({ name, about });
  });

  api
    .getAppData()
    .then(({ cards, userData }) => {
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);

      cardList = new Section(
        {
          items: cards,
          renderer: createCard,
        },
        elementList
      );
    })
    .catch((error) => console.error(`Error fetching initial data: ${error}`));

  profileFormValidator.enableValidation();
  newCardFormValidator.enableValidation();
});
