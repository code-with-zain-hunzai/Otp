import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const Opt = ({ otpLength = 6 }) => {
    const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
    const ref = useRef([]);

    const handleKeyDown = (e, index) => {
        const key = e.key;

        if (key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            ref.current[index - 1]?.focus();
        }
        if (key === "ArrowRight" && index + 1 < otpFields.length) {
            e.preventDefault();
            ref.current[index + 1]?.focus();
        }
        const copyOtpFields = [...otpFields];
        if (key === "Backspace") {
            e.preventDefault();
            copyOtpFields[index] = "";
            setOtpFields(copyOtpFields);
            if (index > 0) ref.current[index - 1]?.focus();
            return;
        }
        if (isNaN(key)) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        copyOtpFields[index] = key;
        setOtpFields(copyOtpFields);
        if (index + 1 < otpFields.length) {
            ref.current[index + 1]?.focus();
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        const copyOtpFields = [...otpFields];
        if (!isNaN(value) && value.length === 1) {
            copyOtpFields[index] = value;
            setOtpFields(copyOtpFields);
            if (index + 1 < otpFields.length) {
                ref.current[index + 1]?.focus();
            }
        }
    };

    useEffect(() => {
        ref.current[0]?.focus();
    }, []);

    return (
        <div className='container'>
            {otpFields.map((value, index) => (
                <input
                    key={index}
                    ref={(currentInput) => (ref.current[index] = currentInput)}
                    type="text"
                    value={value}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onChange={(e) => handleChange(e, index)}
                />
            ))}
        </div>
    );
};

export default Opt;
