import axios from 'axios';

// Apply to every request or Delete auth header
const setAuthToken = token => {
  if (token) axios.defaults.headers.common['Authorization'] = token;
  else delete axios.defaults.headers.common['Authorization'];
};

export default setAuthToken;
