export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.url;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".el__element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(
      ".element__delete-button"
    );

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__text").textContent = this._name;
    this._cardImage = this._element.querySelector(".element__img");
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}