import constant from '../constant';

export function setLevel(level) {
    return {
        type: constant.SET_LEVEL,
        payload: { level }
    }
}


export function clearLevel() {
    return {
        type: constant.CLEAR_LEVEL,
    }
}