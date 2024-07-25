export class DOMCreation {
  constructor(elementType, className, content) {
    this.element = document.createElement(elementType);
    if (className) {
      this.element.classList.add(className);
    }
    this.element.textContent = content;
  }
  appendTo(parent) {
    parent.appendChild(this.element);
  }
}
