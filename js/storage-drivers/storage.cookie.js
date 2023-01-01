"use-strict";

class StorageCookie {
    cookieTime = 86400 * 30;

    setItem(key, value) {
        let d = null;
        let expires = null;

        d = new Date();
        d.setTime(d.getTime() + this.cookieTime * 1000);
        expires = 'expires=' + d.toUTCString();

        document.cookie = `${key}=${value};${expires};path=/`;
    }

    getItem(key) {
        let name = `${key}=`;
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return null;
    }

    deleteItem(key) {
        if (this.getItem(key)) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
}