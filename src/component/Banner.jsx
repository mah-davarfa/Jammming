import React , {useState} from 'react';
import './Banner.css';


export default function Banner({onNameSubmit}) {
    const [name, setName] = useState('')
    const [submitted ,setSubmitted]=useState(false);
    
    
     const handlerNameInput = (e) => {setName(e.target.value)};
        
    const submitHandler = (e) => {  
        e.preventDefault();
       if(name.trim()){
        setSubmitted(true);
        onNameSubmit(name);
       }
    }
    
        
    return(
      <>  
        <div className='banner'>

            <h1>welcome to Jammming {name}! </h1>
            {!submitted && 
            <form onSubmit= {submitHandler} 
             className='searchBar'>
                <input  onChange={handlerNameInput}
                 className='bannerInput' 
                 value={name} 
                type='text'
                placeholder='please Enter your name'
                />

                <button className='bannerButton'
                 type='submit'>Submit</button>
         </form>}
        
         </div>    
        </>   
    )
}
