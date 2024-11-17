import { FadeLoader } from 'react-spinners';

const Loader = ({ color = "#3498db", size = 30 }) => {
    return (
        <div className="flex justify-center items-center">
            <FadeLoader color={color} size={size} />
        </div>
    );
};

export default Loader;
