import constant from '../constant';

export function setUserInfo(user) {
    return {
        type: constant.SET_USER_INFO,
        payload: { user }
    }
}


export function clearUserInfo() {
    return {
        type: constant.CLEAR_USER_INFO
    }
}