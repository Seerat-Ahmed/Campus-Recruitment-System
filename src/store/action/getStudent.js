import constant from '../constant';


export function getStudent(user, key) {
    return {
        type: constant.GET_STUDENT,
        payload: {
            user, key
        }
    }
}