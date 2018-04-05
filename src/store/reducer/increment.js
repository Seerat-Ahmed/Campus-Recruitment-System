import constant from '../contant';


export default (state = 0, action) => {

    switch (action.type) {

        case constant.COUNTER:
            return state + 1;

        default:
            return state;
    }

}