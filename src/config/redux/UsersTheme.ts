interface Action {
    type: string
}

const DARK_THEME = 'DARK_THEME';
const LIGHT_THEME = 'LIGHT_THEME';

function setDarkTheme() {
    localStorage.setItem("theme", DARK_THEME);
    return {
        type: DARK_THEME
    }
}

function setLightTheme() {
    localStorage.setItem("theme", LIGHT_THEME);
    return {
        type: LIGHT_THEME
    }
}

function themeReducer(state: boolean = false, action: Action) {
    switch (action.type) {
        case DARK_THEME:
            return true;
        case LIGHT_THEME:
            return false;
        default:
            return state;
    }
}

export {themeReducer, setDarkTheme, setLightTheme, DARK_THEME, LIGHT_THEME}
