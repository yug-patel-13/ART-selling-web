// Next.js
import React, { useEffect, useState } from 'react';
import "./Next.css"
const Next = () => {
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const yug = JSON.parse(localStorage.getItem('selectedItem'));
    setSelectedItem(yug);
  }, []);

  return (
    <div id='sketchingg'>
   
    
        <div id="framee">
            <img src="check.png" alt="" id='cc'/>
    <h2 id='green'>congratulations your order confirmed</h2>
    selected item :<h1>{selectedItem.name}</h1>
    <img src={selectedItem.image} alt="items" id='ord' />
    <h1>price:{selectedItem.price}</h1>

   

    
    
    </div>
    </div>
  );
};

export default Next;
