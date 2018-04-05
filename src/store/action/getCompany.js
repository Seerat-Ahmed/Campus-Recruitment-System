import constant from '../constant';


export function getCompany(user, key) {
    return {
        type: constant.GET_COMPANY,
        payload: {
            user, key
        }
    }
}