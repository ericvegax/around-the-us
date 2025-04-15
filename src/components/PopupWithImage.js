import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });

        this._imageTitle = this._popupElement.querySelector('.modal__caption-element');
        this._imageModalView = this._popupElement.querySelector('.modal__image-element');
    }

    open(caption, imageUrl) {
        this._imageModalView.src = imageUrl;
        this._imageModalView.alt = caption;
        this._imageTitle.textContent = caption;

        super.open();
    }
}