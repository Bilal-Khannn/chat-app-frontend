import React from 'react';
import styles from './search.module.css';

const Search = ({
    type,
    placeholder,
    value,
    onChange,
    className
}: {
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${className ? className : styles.input} `}
        />
    );
};

export default Search;
