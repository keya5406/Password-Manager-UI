import axios from 'axios';
import config from '../../config';

export const registerUser = async (email, hashedPassword, salt) => {
  const apiUrl = config.apiUrl;
  const response = await axios.post(
    `${apiUrl}/api/register`,
    { email, hashedPassword, salt },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};
