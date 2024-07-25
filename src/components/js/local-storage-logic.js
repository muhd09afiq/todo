export class LocalStorage {
  static saveItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static retrieveItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
