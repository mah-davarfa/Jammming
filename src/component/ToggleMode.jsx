import React , { useContext} from 'react';
import {AppContext} from '../context/AppContext';
import '../styles/darkMode.css';


const ToggleMode = () => {

    const {isDarkMode , setIsDarkMode} = useContext(AppContext);
        const togglMode = () => {
            setIsDarkMode((prevMode) => !prevMode);
        }
        
        return (
        <div>
            <button onClick={togglMode} 
            className={!isDarkMode ?'toggle-light-button':'toggle-dark-button'}>
                {isDarkMode?'Light  Mode': 'Dark Mode'}

            </button>
        </div>
    )
}
export default ToggleMode;