"use-strict";

class StorageLocal {
    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

    deleteItem(key) {
        return localStorage.removeItem(key);
    }
}