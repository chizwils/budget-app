import React, { useEffect, useState,useRef } from "react"
import { useParams } from "react-router-dom"

export const ItemDetails =()=>{
    const item = useParams()
    console.log(item, 'item')
   // const total = useRef()
   const dateFormatter =(curr)=>{
    const date = new Date(curr);
    return date.toString()
   }
    const [total, setTotal] = useState(item.price)
    const[paid, setPaid] = useState()
    const[editedAmount, setEditedAmount] = useState()
    const [allPaidaMount, setAllPaidAmount] = useState([])
    const[editMode, setEditMode] = useState(false)
    const onChange = (e)=>{
        setPaid({
            id:allPaidaMount.length+1,
            amount: parseInt(e.target.value),
            isEditMode: false,
            timeInitialInput:  dateFormatter(Date.now())
            // timeModified: insertModifiedDateTimeHere

        })
    }
    const onChangeEdit =(e)=>{
        setEditedAmount(e.target.value)
    }
    const onEdit =(id)=>{
        const temp = [...allPaidaMount]
        temp.map(item=>{
         if(item.id === id ){
          item.amount=parseInt(editedAmount)
          item.isEditMode = false
          item.lastUpdated = dateFormatter(  Date.now())
          }
     else return item
        })
        setAllPaidAmount(temp)
    }


    const onShowMode=(id)=>{
       //editMode = true
       const temp = [...allPaidaMount]
       temp.map(item=>{
        if(item.id === id ){
        return item.isEditMode=true
    
    }
    else return item
       })
       setAllPaidAmount(temp)
       
   }
   const onEditMode=(id)=>{
      const temp = [...allPaidaMount]
      
   }
   console.log(editMode)
  // 
    
    //calculate total
    useEffect(()=>{
        console.log(allPaidaMount)
        setTotal(item.price - allPaidaMount?.reduce((a,b)=>a + b.amount, 0))
    },[allPaidaMount])
   
    //when you press edit, An inbox should come and then you edit there and update


    const addAmount =()=>{
        setAllPaidAmount([...allPaidaMount,paid])
        setPaid({})
        
    }
   
    return(
        <div>
       <h1>Name of company: {item.bill}    </h1>
       <h3>Amount Owed: {item.price}</h3>
       <input onChange={onChange} placeholder="insert paid value"  value={paid?.amount||''}/>
       <button onClick={addAmount}>Add amount</button>
       <h1>List of payment</h1>
       {allPaidaMount && allPaidaMount.map((item, idx)=>{
      
        return(
            <div key={`${item.id}-${idx}`}>
               {item.isEditMode?<input onChange={onChangeEdit} placeholder={`update $${item.amount}`}/>:<p>{item.amount}: {item.timeInitialInput}: {item.lastUpdated&&item.lastUpdated}</p>}
                {item.isEditMode?<button onClick={()=>onEdit(item.id)}>Add</button>: <button onClick={()=>onShowMode(item.id)}>Edit</button> }
            </div>
        )
       })}
       <h4>TOTAL LEFT: {total}</h4>
        </div>
    )
}

// const editModeItem = ({item, isEditMode})=>{
//     return(
//         <div >
//         <p>{item.amount}</p>
//         {editMode?<button onClick={onEditMode}>Add</button>: <button onClick={onShowMode}>Edit</button> }
//     </div>
//     )

// }