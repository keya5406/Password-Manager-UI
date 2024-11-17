import axios from 'axios';


export const loginUser = async (email, hashedPassword, setError) => {
    try {
        const response = await axios.post('/api/login', {
            email,
            hashedPassword,
        });

        if (response.status === 200 && response.data.success) {
            return true;
        }
        setError((prev) => ({
            ...prev,
            form: response.data.message || 'Login failed. Please try again.',
        }));
        return false;
    } catch (error) {
        if (error.response) {

            switch (error.response.status) {
                case 401:
                    setError((prev) => ({
                        ...prev,
                        form: 'Password is incorrect.',
                    }));
                    break;
                case 404:
                    setError((prev) => ({
                        ...prev,
                        form: 'Email address not found.',
                    }));
                    break;
                case 500:
                    setError((prev) => ({
                        ...prev,
                        form: 'Server error. Please try again later.',
                    }));
                    break;
                default:
                    setError((prev) => ({
                        ...prev,
                        form: 'An unexpected error occurred. Please try again.',
                    }));
            }
        } else {
            setError((prev) => ({
                ...prev,
                form: 'Network error. Please check your connection and try again.',
            }));
        }
        return false;
    }
};
