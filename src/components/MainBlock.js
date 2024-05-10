import React, { useState } from 'react';
import SearchImage from '../assets/images/search.svg';
import getWords from '../api/words/getWords';
import styles from './MainBlock.module.css';


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

    const playAudio = (audioUrl) => {
        const correctAudioUrl = audioUrl.startsWith('http') ? audioUrl : `https:${audioUrl}`;
        const audio = new Audio(correctAudioUrl);
        audio.play().catch(e => console.error("Ошибка воспроизведения аудио:", e));
    };
    


    return (

        <div className={styles.bodyTransitions}>
            <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    type="text"
                    className={styles.inputField}
                    value={word}
                    onChange={handleChange}
                    placeholder="Enter a word..."
                />
                <button type="submit" className={styles.searchButton}>
                    <img type="submit" src={SearchImage} alt="Search" />
                </button>
            </form>
            {error && 
                <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>
                    😢 Oops! Something went wrong: {error}
                </p>
            </div>}
            {wordInfo && (
                 <div className="word-details">
                 {wordInfo.map((info, index) => (
                     <div key={index} className={styles.wordCard}>
                         <h2 className={styles.bigBoldText}>{info.word}</h2>
                         {info.phonetics && info.phonetics.length > 0 && (
                            <div className={styles.phonetic}>
                                <span>{info.phonetics[0].text}</span>
                                {info.phonetics[0].audio && (
                                <button onClick={() => playAudio(info.phonetics[0].audio)} className={styles.audioButton}>
                                    🔊
                                </button>
                                
                                )}
                            </div>
                        )}
                        
                        {info.meanings.map((meaning, index) => (
                            <div key={index}>
                                <div className={styles.nounContainer}>
                                    <p>{meaning.partOfSpeech}</p>
                                    <hr />
                                </div>
                                <h3>Meaning</h3>
                                <ul className={styles.definitionList}>
                                    {meaning.definitions.map((def, idx) => (
                                        <li key={idx}>
                                            {def.definition}
                                            {def.example && (
                                                <p className={styles.exampleStyle}>"{def.example}"</p>
                                            )}
                                        </li>
                                ))}
                                </ul>
                                {meaning.synonyms && meaning.synonyms.length > 0 && (
                                <div className={styles.synonymContainer}>
                                    <h4>Synonyms</h4>
                                    <p>{meaning.synonyms.join(', ')}</p>
                                </div>
                                
                                
                            )}
                            
                            </div>
                            
                        ))}
                        
                     </div>
                 ))}
                 <hr />
                 <div className={styles.urlContainer}>
                    <p>Source: <a href={wiktionaryUrl} target="_blank" rel="noopener noreferrer">{wiktionaryUrl}</a></p>
                </div>
             </div>
            )}
            </div>
        </div>
    );
};

export default MainBlock;
