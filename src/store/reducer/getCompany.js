import constant from '../constant';


export default (state = [], action) => {
    switch (action.type) {
        case constant.GET_COMPANY:
            return [...state, action.payload];

        default:
            return [...state];
    }
}