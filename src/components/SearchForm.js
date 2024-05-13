import React from 'react';
import styles from './SearchForm.module.css'; 

const SearchForm = ({ word, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className={styles.searchForm}>
            <input
                type="text"
                className={styles.inputField}
                value={word}
                onChange={onChange}
                placeholder="Enter a word..."
            />
            <button type="submit" className={styles.searchButton}>
                <img src={require('../assets/images/search.svg').default} alt="Search" />
            </button>
        </form>
    );
};

export default SearchForm;
