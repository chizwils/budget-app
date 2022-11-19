import React, { useState } from 'react';

import {  Link} from "react-router-dom";
//create a redux to store all 

export const Home =()=>{
    const [state,setState] = useState([])
    const [bill, setBill] = useState({id:state.length+1,bill:'',price:''})
  
    const onChange =(e)=>{
      setBill({...bill,id:state.length+1,[e.target.name]: e.target.value,})
    }
    const handleClick =(e)=>{
      e.preventDefault()
      setState([...state, bill])
      setBill({bill:'',price:''})
    }
    console.log(bill)
    console.log(state)
    return(
        <div>
        <form onSubmit={handleClick}>
          <input onChange={onChange} name='bill'placeholder='add bill name' value={bill.bill}/>
          <input onChange={onChange} name='price' placeholder='insert price in number' value={bill.price}/>
          <button >Add</button>
        </form>
  
        <h1>List of bills and prices</h1>
      
        <div>
         { state&&state.map(item=>{
           return (<Link to={`/company/${item.id}/${item.bill}/${item.price}`} > <div>{item.bill}</div><div>{item.price}</div></Link>)
          })}
      
        </div>
  
    
        
        
        
      </div>
    )
}