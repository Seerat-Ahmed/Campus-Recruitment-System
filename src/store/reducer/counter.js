import constant from '../constant';

export default (state = 0, action) => {

    switch (action.type) {
        case constant.INCREMENT:
            return state + 1;

        case constant.DECREMENT:
            return state - 1;

        default:
            return state;
    }
}