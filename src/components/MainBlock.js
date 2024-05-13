import React, { useState } from 'react';
import getWords from '../api/words/getWords';
import styles from './MainBlock.module.css';
import Card from './Card';
import SearchForm from './SearchForm'; 


const MainBlock = () => {
    const [word, setWord] = useState('');
    const [wordInfo, setWordInfo] = useState(null);
    const [error, setError] = useState(''); 
    const [wiktionaryUrl, setWiktionaryUrl] = useState(''); 

    const fetchWordInfo = async () => {
        if (!word) return;
        const result = await getWords(word);
        setWordInfo(result.data);
        setError(result.error);
        setWiktionaryUrl(result.wiktionaryUrl);
    };

    const handleChange = (event) => {
        setWord(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWordInfo();
    };

    const playAudio = (getWords) => {
        const correctAudioUrl = getWords.startsWith('http') ? getWords : `https:${getWords}`;
        const audio = new Audio(correctAudioUrl);
        audio.play().catch(e => console.error("Ошибка воспроизведения аудио:", e));
    };
    


    return (

        <div className={styles.bodyTransitions}>
            <div className={styles.container}>
            <SearchForm word={word} onChange={handleChange} onSubmit={handleSubmit} />
            {error && 
                <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>
                    😢 Oops! Something went wrong: {error}
                </p>
            </div>}
            {wordInfo && (
                    <Card wordInfo={wordInfo} playAudio={playAudio} />
                )}
                {wiktionaryUrl && (
                    <div className={styles.urlContainer}>
                        <p>Source: <a href={wiktionaryUrl} target="_blank" rel="noopener noreferrer">{wiktionaryUrl}</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainBlock;
