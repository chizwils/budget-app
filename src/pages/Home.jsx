import React, { useState } from 'react';
import { API } from "aws-amplify";
import { createDebt } from '../graphql/mutations';
import { listDebts } from '../graphql/queries';
import {  Link} from "react-router-dom";
//create a redux to store all 

export const Home =()=>{
    const [state,setState] = useState([])
    const [bill, setBill] = useState({id:state.length+1,bill:'',price:''})
  
    const onChange =(e)=>{
      setBill({...bill,id:state.length+1,[e.target.name]: e.target.value,})



    }

//create a debt 
// async function createNote(event) {
//     event.preventDefault();
//     const form = new FormData(event.target);
//     const data = {
//       name: form.get("name"),
//       description: form.get("description"),
//     };
//     await API.graphql({
//       query: createNoteMutation,
//       variables: { input: data },
//     });
//     fetchNotes();
//     event.target.reset();
//   }
// }
// const newDebt = await API.graphql({
//     query: createDebt,
//     variables: {
//         input: {
// 		"name": "Lorem ipsum dolor sit amet",
// 		"createdAt": "Lorem ipsum dolor sit amet",
// 		"currentAmountOwed": 123.45,
// 		"initialAmountOwed": 123.45,
// 		"isPaidOf": true,
// 		"payments": []
// 	}
//     }
// });
const listingDebts = async()=>{
    const apiData = await API.graphql({ query: listDebts });
   console.log(apiData, 'hois')

}
    const handleClick = async (e)=>{
      e.preventDefault()
      setState([...state, bill])
      setBill({bill:'',price:''})
      await API.graphql({
              query: createDebt,
              variables: { input: {
                "name": "Lorem ipsum dolor sit amet",
                "createdAt": "Lorem ipsum dolor sit amet",
                "currentAmountOwed": 123.45,
                "initialAmountOwed": 123.45,
                "isPaidOf": true,
                "payments": []
            } },
            });

      
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
        <button onClick={listDebts}>List notes</button>
        <h1>List of bills and prices</h1>
      
        <div>
         { state&&state.map(item=>{
           return (<Link to={`/company/${item.id}/${item.bill}/${item.price}`} > <div>{item.bill}</div><div>{item.price}</div></Link>)
          })}
      
        </div>
  
    
        
        
        
      </div>
    )
}