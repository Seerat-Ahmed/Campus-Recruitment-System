import constant from '../constant';


export function setToLoggedIn() {
    return {
        type: constant.LOGGED_IN
    }
}

export function setToLoggedOut() {
    return {
        type: constant.LOGGED_OUT
    }
}