interface Action {
    type: string
}

const DARK_THEME = 'DARK_THEME';
const LIGHT_THEME = 'LIGHT_THEME';

function setDarkTheme() {
    return {
        type: DARK_THEME
    }
}

function setLightTheme() {
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
            return false;
    }
}

export {themeReducer, setDarkTheme, setLightTheme}
