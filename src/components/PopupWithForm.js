import Popup from "./Popup";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._formElement = this._popupElement.querySelector(".modal__form");
    this._formInputs = this._formElement.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._formElement.reset();
    // this._formElement.removeEventListener('submit', this._submitForm);
    super.close();
  }

  _getInputValues() {
    const values = {};

    this._formInputs.forEach((input) => {
      values[input.name] = input.value;
      console.log(`Key: ${input.name} Value: ${input.value}`);
    });

    return values;
  }

  _submitForm = (event) => {
    event.preventDefault();
    
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._submitForm);
  }
}
