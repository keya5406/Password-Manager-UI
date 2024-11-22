import axios from 'axios';

export const fetchSalt = async (email) => {
    
    try {
        const response = await axios.get('/api/salt', { params: { email } });
        return response.data?.Salt;
    } catch (error) {
        throw new Error('No account found with this email. Please check and try again.');


    }
};

export const login = async (email, hashedPassword) => {
    try {
        const response = await axios.post('/api/login', { email, hashedPassword });
        return response; 
    } catch (error) {
        throw new Error('Email or password is incorrect. Please try again.');
    }
};
