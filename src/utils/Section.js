
export default class Section {
    constructor({ items, renderer }, parentContainer) {
        this._items = items;
        this._renderer = renderer;
        this._parentContainer = parentContainer;
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(childElement) {
        this._parentContainer.append(childElement);
    }
}