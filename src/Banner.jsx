import React , {useState, useEffect} from 'react';
import './Banner.css';


export default function Banner({onNameSubmit}) {
    const [name, setName] = useState('')
    const [submitted ,setSubmitted]=useState(false);
    const[accepttedUseUserspotifyuserName ,setAccepttedUseUserspotifyuserName] = useState(false);
    const [spotifyUserName ,setSpotifyUserName] = useState('');
    const [spotifyPassword ,setSpotifyPassword] = useState('');
    const [defaultUserName ,setDefaultUserName] = useState('');
          
      const defaultGuestUserName = 'iliya.davarfara84@gmail.com';
    
     const onChangeHandler = (e) => {setName(e.target.value)};
        
    const submitHandler = (e) => {  
        e.preventDefault();
       if(name.trim()){
        setSubmitted(true);
        onNameSubmit(name);
       }
    }
    const getUserNameHandler = (e) => {
           setSpotifyUserName(e.target.value);
    }
    const getUserpasswordHandler = (e) => {
            setSpotifyPassword(e.target.value);
    }
        
    return(
        <>
        <div className='banner'>
            <h1>Jammming </h1>
            <form onSubmit= {submitHandler}  className='bannerForm'>
                <input  onChange={onChangeHandler}
                 className='bannerInput' 
                 value={name} 
                type='text'
                placeholder='please Enter your name'
                />

                <button className='bannerButton'
                 type='submit'>Submit</button>
            
            {submitted && ( 
            <> 
            <h2>Hello {name} </h2>
            {!accepttedUseUserspotifyuserName &&( <>
                    <h3>Would you like to use your spotify user name?</h3>
                   <button className='bannerButton'type="button" onClick={()=>(setAccepttedUseUserspotifyuserName(true))}>i use my user Name</button><span> Or </span>
                    <button className='bannerButton'type="button" onClick={()=>setDefaultUserName(defaultGuestUserName)}>i like to use spotify as Guest</button>
                </>)}    
            </>)}
            {accepttedUseUserspotifyuserName &&( 
                <> 
                <input onChange={getUserNameHandler}
             placeholder='enter your Email'className='bannerInput'
              value={spotifyUserName} type='text'/><span> and </span>
               <input onChange={getUserpasswordHandler}
             placeholder='enter your password'className='bannerInput'
              value={spotifyPassword} type='password'/>
              </>)}
            </form>         
        </div>
            
        </>
    )
}