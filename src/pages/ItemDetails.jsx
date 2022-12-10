import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { getDebt } from "../graphql/queries";
import { updateDebt } from "../graphql/mutations";
import { UpdateForm } from "./updateForm";

export const ItemDetails = () => {
  const item = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [total, setTotal] = useState();
  const fetchByID = async () => {
    const apiData = await API.graphql({
      query: getDebt,
      variables: { id: item.id },
    });
    console.log(apiData, "id");
    setInfo(apiData?.data?.getDebt.initialAmountOwed);
    setTotal(apiData?.data?.getDebt.currentAmountOwed);
    setAllPaidAmount(apiData.data?.getDebt?.payments);
    console.log(allPaidaMount, "io");
  };
  useEffect(() => {
    fetchByID();
  }, []);
  console.log(item, "item");
  // const total = useRef()
  const dateFormatter = (curr) => {
    const date = new Date(curr);
    return date.toString();
  };

  const [paid, setPaid] = useState();
  const [editedAmount, setEditedAmount] = useState();
  const [allPaidaMount, setAllPaidAmount] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const onChange = (e) => {
    setPaid({
      amountPaid: parseInt(e.target.value),
      // isEditMode: false,
      // timeInitialInput:  dateFormatter(Date.now())
      // timeModified: insertModifiedDateTimeHere
    });
  };
  const onChangeEdit = (e) => {
    setEditedAmount(e.target.value);
  };
  const onEdit = (id) => {
    const temp = [...allPaidaMount];
    temp.map((item) => {
      if (item.id === id) {
        item.amount = parseInt(editedAmount);
        item.isEditMode = false;
        item.lastUpdated = dateFormatter(Date.now());
      } else return item;
    });
    setAllPaidAmount(temp);
  };

  const onShowMode = (id) => {
    //editMode = true
    const temp = [...allPaidaMount];
    temp.map((item) => {
      if (item.id === id) {
        return (item.isEditMode = true);
      } else return item;
    });
    setAllPaidAmount(temp);
  };
  const onEditMode = (id) => {
    const temp = [...allPaidaMount];
  };
  console.log(editMode);
  //

  //calculate total
  useEffect(() => {
    console.log(allPaidaMount);
    setTotal(total - allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0));
  }, [allPaidaMount]);

  //when you press edit, An inbox should come and then you edit there and update

  const addAmount = async () => {
    setAllPaidAmount([...allPaidaMount, paid]);
    const apiData = await API.graphql({
      query: updateDebt,
      variables: {
        input: {
          id: item.id,
          payments: allPaidaMount,
        },
      },
    });
    setPaid({});
  };
  const payment = [
    {
      amountPaid: 5,
    },
    { amountPaid: 5 },
  ];
  const deposited = async () => {
    const apiData = await API.graphql({
      query: updateDebt,
      variables: {
        input: {
          id: item.id,
          payments: payment,
        },
      },
    });
    //  await API.graphql({
    //       query: createDebt,
    //       variables: { input: {
    //         "name": bill.name,
    //         "createdAt": dateFormatter(Date.now()),
    //         "currentAmountOwed": bill.initialAmountOwed,
    //         "initialAmountOwed": bill.initialAmountOwed,
    //         "isPaidOf": true,
    //         "payments": []
    //     } },
    //     });
    console.log(apiData, "v");
  };

  return (
    <div>
      <h1>Name of company: {item.bill} </h1>

      <h3>Amount Owed: {item.price}</h3>
      <input
        onChange={onChange}
        placeholder="insert paid value"
        value={paid?.amountPaid || ""}
      />
      <button onClick={addAmount}>Add Paying amount</button>
      <h1>List of payment</h1>
      {allPaidaMount &&
        allPaidaMount.map((item, idx) => {
          return (
            <div key={`${item.id}-${idx}`}>
              {item.isEditMode ? (
                <input
                  onChange={onChangeEdit}
                  placeholder={`update $${item.amount || 0}`}
                />
              ) : (
                <p>
                  {item.amountPaid}: {item.timeInitialInput}:{" "}
                  {item.lastUpdated && item.lastUpdated}
                </p>
              )}
              {item.isEditMode ? (
                <button onClick={() => onEdit(item.id)}>Add</button>
              ) : (
                <button onClick={() => onShowMode(item.id)}>Edit</button>
              )}
            </div>
          );
        })}
      <h4>TOTAL LEFT: {total}</h4>
      <h3>Initially owed: {info}</h3>
      <button onClick={() => navigate("/", { replace: true })}>
        Back to List
      </button>
      {/* <UpdateForm
        onChange={onChangeEdit}
        currentState={item.amount}
        update={updatePayment}
      /> */}
    </div>
  );
};

// const editModeItem = ({item, isEditMode})=>{
//     return(
//         <div >
//         <p>{item.amount}</p>
//         {editMode?<button onClick={onEditMode}>Add</button>: <button onClick={onShowMode}>Edit</button> }
//     </div>
//     )

// }
