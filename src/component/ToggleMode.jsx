import React , { useContext} from 'react';
import {AppContext} from '../context/AppContext';
import '../styles/darkMode.css';


const ToggleMode = () => {

    const {isDarkMode , setIsDarkMode,setUserToken,setContinueToSearchAsGuest,
        setContinueToSearchAfterLogin,setSubmitted,setName} = useContext(AppContext);
        const togglMode = () => {
            setIsDarkMode((prevMode) => !prevMode);
        }
        
        return (
        <div>
            <button onClick={togglMode} 
            className={!isDarkMode ?'toggle-light-button':'toggle-dark-button'}>
                {isDarkMode?'Light  Mode': 'Dark Mode'}

            </button>
             <button onClick={() => {
                localStorage.setItem('name', JSON.stringify(''));
                localStorage.setItem('submitted', JSON.stringify(false));
                localStorage.removeItem('code_verifier-spotify');  
                setName('');
                setSubmitted(false);
                setContinueToSearchAfterLogin(false);
                setUserToken(null);
                setContinueToSearchAsGuest(false);
              }}>
                Log Out
             </button>
              
        </div>
    )
}
export default ToggleMode;