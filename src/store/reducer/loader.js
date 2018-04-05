import constant from '../constant';

export default (state = true, action) => {
    switch (action.type) {
        case constant.START_LOADING:
            return true;

        case constant.STOP_LOADING:
            return false;

        default:
            return state;
    }
}