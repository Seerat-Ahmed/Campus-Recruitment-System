import constant from '../constant';

export default (state = null, action) => {
    switch (action.type) {

        case constant.SET_USER_INFO:
            return action.payload.user;

        case constant.CLEAR_USER_INFO:
            return null;

        default:
            return state;
    }
}