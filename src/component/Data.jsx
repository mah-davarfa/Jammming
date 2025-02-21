import React, { useState, useEffect } from 'react';

export default function Data({searchTerm ,onSearchTerm}) {

    //While up dating fetch i need to use searTerm to be fetched
const [data ,setdata] = useState(null);
   
            useEffect(()=>{
                if (!searchTerm) return;
                fetch('./data.json')
                .then((res)=>res.JSON())
                .then((data)=>
                    {setdata(data)
                    onSearchTerm(data);
            })
                 .catch((error)=>clonsol.error('Error in fetching:', error))
            },[searchTerm] )
            if(!data){
                return <div>Loading...</div>
            }

    (
        <div>

        </div>
    )
}
    
