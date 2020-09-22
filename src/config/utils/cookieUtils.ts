function clearAllPaths(window: Window, cookieBase: string) {
    let p = window.location.pathname.split('/');
    window.document.cookie = cookieBase + '; path=/';
    while (p.length > 0) {
        window.document.cookie = cookieBase + '; path=' + p.join('/');
        p.pop();
    }

}

function cookieUtils(window: Window) {
    let cookies = window.document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
        let encodedCookieName = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]);
        let cookieBase = encodedCookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        clearAllPaths(window, cookieBase);

        let d = window.location.hostname.split(".");
        while (d.length > 0) {
            clearAllPaths(window, cookieBase + '; domain=' + d.join('.'));
            d.shift();
        }
    }
}

function deleteAllCookiesFactory(window: Window) {
    return cookieUtils.bind(window, window);
}

function removeAllCookies() {
    // @ts-ignore
    window.clearCookies = deleteAllCookiesFactory(window);
    // @ts-ignore
    window.clearCookies();
}

function readCookieByKeyName(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export {removeAllCookies, readCookieByKeyName}

