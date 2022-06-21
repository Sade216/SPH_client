import React from 'react';
// import './dark.css';

const Theme = () => {
    document.documentElement.style.setProperty('--background-00', 'rgb(31, 36, 43)');
    document.documentElement.style.setProperty('--background-00-05', 'rgba(31, 36, 43,0.8)');
    document.documentElement.style.setProperty('--background-01', 'rgba(38, 45, 55, 1)');
    document.documentElement.style.setProperty('--background-02', 'rgba(49, 55, 66, 1)');
    document.documentElement.style.setProperty('--background-03', 'rgba(60, 66, 77, 1)');
    document.documentElement.style.setProperty('--background-04', 'rgba(60, 66, 77, 1)');

    document.documentElement.style.setProperty('--text-01', 'rgba(240, 240, 240, 1)');
    document.documentElement.style.setProperty('--text-02', 'rgba(148, 154, 156, 1)');
    document.documentElement.style.setProperty('--text-03', 'rgb(44, 44, 44)');
    document.documentElement.style.setProperty('--accent-01', 'rgba(49, 166, 239, 1)');

    document.documentElement.style.setProperty('--player-bg', 'rgba(31, 36, 43,0.8)');
    document.documentElement.style.setProperty('--player-bg2', 'rgba(60, 66, 77, 1)');
    document.documentElement.style.setProperty('--player-text', 'rgba(240, 240, 240, 1)');
    document.documentElement.style.setProperty('--player-text2', 'rgba(148, 154, 156, 1)');
    document.documentElement.style.setProperty('--player-btns', 'rgb(240, 240, 240, 1)');
    return (
        <React.Fragment></React.Fragment>
    )
};

export default Theme;