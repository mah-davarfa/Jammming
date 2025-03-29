import React , {useState} from 'react';
import '../styles/Banner.css';
import '../styles/darkMode.css';


export default function Banner({onNameSubmit}) {
    const [name, setName] = useState('')
    const [submitted ,setSubmitted]=useState(false);
    const [continueToSearch , setContinueToSearch] = useState(false);
    
     const handlerNameInput = (e) => {setName(e.target.value)};
        
    const submitHandler = (e) => {  
        e.preventDefault();
       if(name.trim()){
        setSubmitted(true);
        onNameSubmit(name);
       }
    }
    const handleLogin = () => {
    ///window.location.href =
    setContinueToSearch(true);
    }
    const handleGuest = () => {
        setContinueToSearch(true);
    }
        
    return(
      <>  
        <div className='banner'>
           
            <h1>welcome to Jammming {submitted ? name : ''}! </h1>
            {submitted?(
            <div>
            <button 
                         type='submit'
                         onClick={handleLogin}>
                            Log in to Spotify
                        </button>
                        <button
                         type='submit'
                         onClick={handleGuest}>
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
