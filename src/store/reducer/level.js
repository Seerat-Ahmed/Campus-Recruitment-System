import constant from '../constant';


export default (state = '', action) => {
    switch (action.type) {
        case constant.SET_LEVEL:
            return action.payload.level;

        case constant.CLEAR_LEVEL:
            return '';
            
        default:
            return state;
    }
}