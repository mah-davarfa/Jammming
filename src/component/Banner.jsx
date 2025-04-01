import React , {useEffect,useState,useContext} from 'react';
import '../styles/Banner.css';
import '../styles/darkMode.css';
import { AppContext } from '../context/AppContext.jsx';

export default function Banner() {
   
   
    const { continueToSearchAfterLogin,setContinueToSearchAsGuest,
    continueToSearchAsGuest,handleLoginToSpotify,submitted,name,handlerNameInput,submitHandler} = useContext(AppContext);
    
    
   

    const handleContinueAsGuest = () => {
        setContinueToSearchAsGuest(true);
    }
   

      return (  
      <>  
        <div className='banner'>
           
            <h1>welcome to Jammming {submitted ? name : ''}! </h1>
            {submitted?(
            <div>
            {!continueToSearchAfterLogin &&  (<button 
                         type='submit'
                         onClick={handleLoginToSpotify} >
                            Log in to Spotify
                        </button>)}
                        {(!continueToSearchAsGuest && !continueToSearchAfterLogin) ? <button
                         type='submit'
                         onClick={handleContinueAsGuest}>
                            continue As Guest
                        </button>: '' }
            </div> ): ''}           
            {!submitted && 
            <form onSubmit= {submitHandler} 
             className="search-container">
                <input  onChange={handlerNameInput}
                 className='bannerInput' 
                 value={name} 
                type='text'
                placeholder='please Enter your name'
                />

                <button 
                 type='submit'>
                    Submit
                </button>
             
         </form>}
        
         </div>    
        </>   
    )
}
