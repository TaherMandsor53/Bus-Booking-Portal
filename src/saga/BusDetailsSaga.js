import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../action/actionTypes';
import api from '../api/api';

function* fetchBusDetails(action) {
  try {
    const busDetails = yield call(api.fetchBusDetails);

    yield put({
      type: types.BUS_DETAILS_SUCCESS,
      busDetailsData: busDetails,
    });
  } catch (e) {
    yield put({ type: types.BUS_DETAILS_ERROR, message: e.message });
  }
}

function* busDetailsSaga() {
  yield takeLatest(types.BUS_DETAILS_REQUEST, fetchBusDetails);
}

export default busDetailsSaga;
