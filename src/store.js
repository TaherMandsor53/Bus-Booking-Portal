import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import userDetailsSaga from './saga/LoginSaga';
import busDetailsSaga from './saga/BusDetailsSaga';

const sagaMiddleware = createSagaMiddleware();
export default createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userDetailsSaga);
sagaMiddleware.run(busDetailsSaga);
