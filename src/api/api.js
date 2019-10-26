import axios from 'axios';

const fetchUserDetails = () => {
  const URL = `https://car-backnd.herokuapp.com/api/userDetails`;
  return axios.get(URL);
};

const fetchBusDetails = () => {
  const URL = `https://car-backnd.herokuapp.com/getAllBuses`;
  return axios.get(URL);
};

export default {
  fetchUserDetails,
  fetchBusDetails,
};
