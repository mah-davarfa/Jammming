import React, { useState, useEffect ,useContext} from 'react';
import { AppContext } from '../context/AppContext.jsx';


export default function Data({onSearchTerm}) {

    //While up dating fetch i need to use searchTerm to be fetched and Spotify guideline fetching( based on artist song and album)
const [data ,setdata] = useState(null);
   
    const {searchTerm} = useContext(AppContext);

            useEffect(()=>{
                if (!searchTerm) return;
                fetch('./data.json')
                    .then((res)=>{
                        if(!res.ok){
                            throw new Error(`HTTP error! status:${res.status}`);
                        }
                        return res.json();
                    })
                
                .then((data)=>
                  {setdata(data)
                   onSearchTerm(data)
                  
            })
            .catch((error)=>console.error('Error in fetching:', error));

            },[searchTerm] )
            if (!searchTerm) {return null;}
           else if(!data){
                return <div>Loading...</div>
            }
return
    (
        <div>

        </div>
    )
}
    
