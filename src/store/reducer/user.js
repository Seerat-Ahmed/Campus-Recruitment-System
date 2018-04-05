import constant from '../contant';


export default (state = null, action) => {

    switch (action.type) {
        case constant.SET_USER:
            return action.payload.user;

        case constant.DELETE_USER:
            return null;

        default:
            return state;
    }
}