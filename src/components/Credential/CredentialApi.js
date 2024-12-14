import axios from 'axios';

export const fetchCredentials = async () => {
    try {
        const { data } = await axios.get('/api/credentials');
        return data;
    } catch (error) {
        let errorMessage = 'Something went wrong. Please try again.';

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    errorMessage = 'Bad request. Please check your input.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized. Please log in again.';
                    break;
                case 404:
                    errorMessage = 'Credentials not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'Unexpected error. Please contact support.';
            }
        } else if (error.request) {
            errorMessage = 'Network error. Please check your connection.';
        }

        console.error('Error fetching credentials:', error.message || error);
        throw new Error(errorMessage);
    }
};