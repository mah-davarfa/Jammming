import React, { useState, useEffect } from 'react';

export default function Data({searchTerm ,onSearchTerm}) {

    //While up dating fetch i need to use searchTerm to be fetched
const [data ,setdata] = useState(null);
   
            useEffect(()=>{
                if (!searchTerm) return;
                fetch('./data.json')
                .then((res)=>res.json())
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
    
