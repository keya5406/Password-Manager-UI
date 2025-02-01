import axios from 'axios';
import config from '../../config';

export const fetchSalt = async email => {
  const apiUrl = config.apiUrl;
  try {
    const response = await axios.get(`${apiUrl}/api/salt`, { params: { email } });
    return response.data?.Salt;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('No account found with this email. Please check and try again.');
    } else {
      throw new Error('Something went wrong. Please try again later.');
    }
  }
};

export const login = async (email, hashedPassword) => {
  const apiUrl = config.apiUrl;
  try {
    const response = await axios.post(`${apiUrl}/api/login`, { email, hashedPassword });
    return response;
  }catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('No account found with this email. Please check and try again.');
    } else if (error.response && error.response.status === 401) {
      throw new Error('Email or password is incorrect. Please try again.');
    } else {
      throw new Error('Something went wrong. Please try again later.');
    }
  }
};
