import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ id, name, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
                className="w-full border-border border-[0.5px] py-1 px-1.5 pr-10"
                placeholder='********'
            />
            <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-xl"
                onClick={handleTogglePassword}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
