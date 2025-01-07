import axios from 'axios';

export const registerUser = async (email, hashedPassword, salt) => {
  const response = await axios.post(
    '/api/register',
    { email, hashedPassword, salt },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};
