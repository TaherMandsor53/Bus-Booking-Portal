import * as types from '../action/actionTypes';

const busDetails = (
  state = {
    isFetching: false,
    busDetailsData: [],
  },
  action,
) => {
  switch (action.type) {
    case types.BUS_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.BUS_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        busDetailsData: action.busDetailsData,
      });
    case types.BUS_DETAILS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.message,
      });
    default:
      return state;
  }
};

export default busDetails;
