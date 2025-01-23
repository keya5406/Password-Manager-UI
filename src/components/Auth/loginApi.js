import axios from 'axios';
import config from '../../config';

export const fetchSalt = async email => {
  const apiUrl = config.apiUrl;
  try {
    const response = await axios.get(`${apiUrl}/api/salt`, { params: { email } });
    return response.data?.Salt;
  } catch (error) {
    throw new Error(
      'No account found with this email. Please check and try again.'
    );
  }
};

export const login = async (email, hashedPassword) => {
  const apiUrl = config.apiUrl;
  try {
    const response = await axios.post(`${apiUrl}/api/login`, { email, hashedPassword });
    return response;
  } catch (error) {
    throw new Error('Email or password is incorrect. Please try again.');
  }
};
