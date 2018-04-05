import { combineReducers } from 'redux';
import counter from './counter';
import authState from './authState';
import setUserInfo from './setUserInfo';
import loader from './loader';
import level from './level';
import company from './getCompany';
import student from './getStudent';

export default combineReducers({
    counting: counter,
    authState: authState,
    user: setUserInfo,
    isLoading: loader,
    level: level,
    companies: company,
    students: student,
});
