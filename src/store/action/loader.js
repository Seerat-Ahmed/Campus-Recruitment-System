import constant from '../constant';

export function startLoading () {
    return {
        type: constant.START_LOADING
    }
}


export function stopLoading() {
    return {
        type: constant.STOP_LOADING
    }
}