import * as actionTypes from "./actionTypes";

export function showSpinner() {
    return {
        type: actionTypes.SHOW_SPINNER,
    }
}

export function hideSpinner() {
    return {
        type: actionTypes.HIDE_SPINNER,
    }
}
