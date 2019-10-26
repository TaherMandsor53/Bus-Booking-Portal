import * as types from './actionTypes';

export function requestUserDetails() {
  return {
    type: types.USER_DETAILS_REQUEST,
  };
}

export function requestBusDetails() {
  return {
    type: types.BUS_DETAILS_REQUEST,
  };
}
