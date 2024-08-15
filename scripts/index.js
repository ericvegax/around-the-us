document.addEventListener("DOMContentLoaded", () => {
    const initialCards = [
      {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      },
      {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
      },
      {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      },
      {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
      },
      {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
      },
      {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      },
    ];
  
    const profileEditButton = document.querySelector(".profile__edit-button");
    const profileEditModal = document.querySelector("#profile-edit-modal");
    const profileCloseButton = document.querySelector("#modal-close-button");
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__descr");
    const profileTitleInput = document.querySelector("#profile-title-input");
    const profileDescriptionInput = document.querySelector("#profile-descr-input");
    const profileEditForm = document.querySelector("#profile-edit-form");
  
    const elementListElement = document.querySelector(".cards__list");
    const elementTemplate = document.querySelector("#element-template").content.firstElementChild;
  
    function closePopUp(popUp) {
      popUp.classList.remove("modal_opened");
    }
  
    function openPopUp(popUp) {
      popUp.classList.add("modal_opened");
    }
  
    function handleProfileEditSubmit(e) {
      e.preventDefault();
      profileTitle.textContent = profileTitleInput.value;
      profileDescription.textContent = profileDescriptionInput.value;
      closePopUp(profileEditModal);
    }
  
    function renderElement(element, container) {
      container.prepend(element);
    }
  
    function getElementView(elementData) {
      const element = elementTemplate.cloneNode(true);
      const elementImageElement = element.querySelector(".element__img");
      const elementTitleElement = element.querySelector(".element__text");
      const likeButton = element.querySelector(".element__like-button");
  
      elementImageElement.src = elementData.link;
      elementImageElement.alt = elementData.name;
      elementTitleElement.textContent = elementData.name;
      return element;
    }

    function deleteElement(e) {
      e.target.closest(".element").remove();
    }
  
    if (profileEditButton) {
      profileEditButton.addEventListener("click", () => {
        profileTitleInput.value = profileTitle.textContent;
        profileDescriptionInput.value = profileDescription.textContent;
        openPopUp(profileEditModal);
      });
    }
  
    if (profileCloseButton) {
      profileCloseButton.addEventListener("click", () => {
        closePopUp(profileEditModal);
      });
    }
  
    if (profileEditForm) {
      profileEditForm.addEventListener("submit", handleProfileEditSubmit);
    }
  
    if (elementListElement && elementTemplate) {
      initialCards.forEach((elementData) => {
        const elementView = getElementView(elementData);
        renderElement(elementView, elementListElement);
      });
    }
  });
