import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducer';


const middleware = applyMiddleware(thunk, logger);
export default createStore(reducer, middleware);