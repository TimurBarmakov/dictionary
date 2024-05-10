import React, { useState, useEffect } from 'react';
import './Header.css';
import BookImage from '../assets/images/book.svg';
import MoonImage from '../assets/images/moon.svg';


const Header = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [fontStyle, setFontStyle] = useState('serif');

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
        document.body.classList.toggle('light-theme', !isDarkTheme);
    }, [isDarkTheme]);

    useEffect(() => {
        document.body.style.fontFamily = fontStyle;
    }, [fontStyle]);

    const handleThemeChange = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const handleFontChange = (event) => {
        setFontStyle(event.target.value);
    };

    const fontStyleSelectStyle = {
        color: isDarkTheme ? '#ffffff' : '#000000', 
        backgroundColor: isDarkTheme ? '#333333' : '#ffffff', 
        transition: 'background-color 0.5s, color 0.5s' 

    };
    

    return (
        <header className="header">
            <div className="container">
                <div className='logoContainer'>
                    <img src={BookImage} alt="Book Logo" />
                </div>
                <div className="settingsContainer">
                    <select id="fontStyleSelect" className="font-select" value={fontStyle} onChange={handleFontChange} style={fontStyleSelectStyle}>
                        <option value="serif">Serif</option>
                        <option value="sans-serif">Sans-Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                    <div className="themeToggle">
                        <label className="switch">
                            <input type="checkbox" id="themeToggleCheckbox" checked={isDarkTheme} onChange={handleThemeChange} />
                            <span className="slider"></span>
                        </label>
                        <div className="themeImage">
                            <img src={MoonImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
