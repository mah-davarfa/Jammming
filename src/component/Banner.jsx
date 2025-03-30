import React , {useState,useContext} from 'react';
import '../styles/Banner.css';
import '../styles/darkMode.css';
import { AppContext } from '../context/AppContext.jsx';

export default function Banner({onNameSubmit}) {
    const [name, setName] = useState('')
    const [submitted ,setSubmitted]=useState(false);
   const {setContinueToSearchAfterLogin,setContinueToSearchAsGuest} = useContext(AppContext);
    
    
    const handlerNameInput = (e) => {setName(e.target.value)};
        
    const submitHandler = (e) => {  
        e.preventDefault();
       if(name.trim()){
        setSubmitted(true);
        onNameSubmit(name);
       }
    }
    const handleLoginToSpotify = () => {
    ///window.location.href =
    setContinueToSearchAfterLogin(true);///must use to login to spotify
    }
    const handleContinueAsGuest = () => {
        setContinueToSearchAsGuest(true);///must contrinue as guest
    }
      return (  
      <>  
        <div className='banner'>
           
            <h1>welcome to Jammming {submitted ? name : ''}! </h1>
            {submitted?(
            <div>
            <button 
                         type='submit'
                         onClick={handleLoginToSpotify}>
                            Log in to Spotify
                        </button>
                        <button
                         type='submit'
                         onClick={handleContinueAsGuest}>
                            continue As Guest
                        </button> 
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
