import React from "react";
import classes from "./Input.module.css";

interface Props {
    type: string;
    name: string;
    text: string;
    error: string | undefined;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
    type,
    name,
    text,
    error,
    value,
    onChange,
}) => {
    return (
        <div className={classes.Form_Container}>
            <div className={classes.Form}>
                <input
                    value={value}
                    type={type}
                    autoComplete="off"
                    placeholder=" "
                    className={error ? classes.Form_Input_error : classes.Form_Input}
                    id={name}
                    onChange={onChange}
                />
                <label htmlFor={name} className={classes.Form_Label}>
                    {text}
                </label>
            </div>
            {error && <div className={classes.error}>{error}</div>}
        </div>
    );
};

export default Input;