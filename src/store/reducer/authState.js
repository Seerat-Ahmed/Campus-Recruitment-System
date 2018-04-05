import constant from '../constant';

export default (state = false, action) => {
    switch (action.type) {

        case constant.LOGGED_IN:
            return true;

        case constant.LOGGED_OUT:
            return false;

        default:
            return state;
    }
}