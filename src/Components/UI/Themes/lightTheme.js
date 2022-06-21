import React from 'react';
// import './light.css';

const Theme = () => {
    document.documentElement.style.setProperty('--background-00', '#5d5d5d');
    document.documentElement.style.setProperty('--background-00-05', '#5d5d5d');
    document.documentElement.style.setProperty('--background-01', '#cfcfcf');
    document.documentElement.style.setProperty('--background-02', '#e0e0e0');
    document.documentElement.style.setProperty('--background-03', '#cbcbcb');
    document.documentElement.style.setProperty('--background-04', '#888888');

    document.documentElement.style.setProperty('--text-01', '#000000');
    document.documentElement.style.setProperty('--text-02', '#5c5c5c');
    document.documentElement.style.setProperty('--text-03', '#ebebeb');
    document.documentElement.style.setProperty('--accent-01', 'rgba(49, 166, 239, 1)');
    
    document.documentElement.style.setProperty('--player-bg', 'rgba(255, 255, 255, 0.4)');
    document.documentElement.style.setProperty('--player-bg2', 'cbcbcb');
    document.documentElement.style.setProperty('--player-text', '#000000');
    document.documentElement.style.setProperty('--player-text2', '#5c5c5c');
    document.documentElement.style.setProperty('--player-btns', '#000000');

    return (
        <React.Fragment></React.Fragment>
    )
};

export default Theme;