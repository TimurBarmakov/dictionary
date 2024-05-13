import React, { useState } from 'react';
import styles from './Card.module.css';

const Card = ({ wordInfo, playAudio }) => {
  return (
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
    </div>
  );
};

export default Card;
