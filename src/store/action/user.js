import constant from '../contant';


export function setUser(user) {
    return {
        type: constant.SET_USER,
        payload: user,
    }
}


export function deleteUser() {
    return {
        type: constant.DELETE_USER,
    }
}