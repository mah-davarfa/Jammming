import React , {useEffect,useState,useContext} from 'react';
import '../styles/Banner.css';
import '../styles/darkMode.css';
import { AppContext } from '../context/AppContext.jsx';

export default function Banner() {
    const [name, setName] = useState('')
    const [submitted ,setSubmitted]=useState(false);
   
    const { continueToSearchAfterLogin,setContinueToSearchAsGuest,
    continueToSearchAsGuest,handleLoginToSpotify} = useContext(AppContext);
    
    
    const handlerNameInput = (e) => {setName(e.target.value)};
        
    const submitHandler = (e) => {  
        e.preventDefault();
       if(name.trim()){
        setSubmitted(true);
       
       }
    }
    //useing useEffect to save the logical atate for after re-directing from spotify
    useEffect(()=>{
        localStorage.setItem('name', JSON.stringify(name));
        localStorage.setItem('submitted', JSON.stringify(submitted));
         }, [name,submitted]);
   
         useEffect(()=>{
        const storedName = localStorage.getItem('name');
        const storedSubmitted = localStorage.getItem('submitted');
        
        if(storedName && storedSubmitted){
            setName(JSON.parse(storedName));
            setSubmitted(JSON.parse(storedSubmitted));
        }
    },[]);

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
