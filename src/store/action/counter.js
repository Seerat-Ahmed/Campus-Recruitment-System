import constant from '../constant';

export function increment() {
    return {
        type: constant.INCREMENT
    }
}

export function decrement() {
    return {
        type: constant.DECREMENT
    }
}