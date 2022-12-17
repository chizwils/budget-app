import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { getDebt, listRecurrings } from "../graphql/queries";
import { updateDebt } from "../graphql/mutations";
import { UpdateForm } from "./updateForm";
import { v4 as uuid } from "uuid";

export const ItemDetails = () => {
  const item = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [total, setTotal] = useState();
  const fetchByID = async () => {
    const apiData = await API.graphql({
      query: listRecurrings,
      variables: { debtID: item.id },
    });
    console.log(apiData, "id");
    setInfo(apiData?.data?.getDebt.initialAmountOwed || 0);
    setTotal(apiData?.data?.getDebt.currentAmountOwed || 0);
    setAllPaidAmount(apiData.data?.getDebt?.payments || 0);
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
      id: uuid(),
      amountPaid: parseInt(e.target.value),
      // isEditMode: false,
      // timeInitialInput:  dateFormatter(Date.now())
      // timeModified: insertModifiedDateTimeHere
    });
    console.log(paid, "");
  };
  const onChangeEdit = (e) => {
    setEditedAmount(e.target.value);
  };

  //calculate total
  useEffect(() => {
    console.log(allPaidaMount);
    setTotal(total - allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0));
  }, [allPaidaMount]);

  //when you press edit, An inbox should come and then you edit there and update

  const addAmount = async () => {
    setAllPaidAmount([...allPaidaMount, paid]);

    console.log(allPaidaMount, "all");
    await API.graphql({
      query: updateDebt,
      variables: {
        input: {
          id: item.id,
          payments: [...allPaidaMount, paid],
        },
      },
    }).then((data) => console.log(data, "hereits"));

    // fetchByID();
    setPaid({});
  };
  const updatePaymentById = async (id) => {
    //find payment bt
    await API.graphql({
      query: updateDebt,
      variables: {
        input: {
          id: item.id,
          payments: [...allPaidaMount, paid],
        },
      },
    });
  };

  const updatePayment = (id) => {
    console.log(id, "the");
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
              <UpdateForm
                onChange={onChangeEdit}
                currentState={item.amountPaid}
                update={() => updatePayment(item.id)}
              />
            </div>
          );
        })}
      <h4>TOTAL LEFT: {total}</h4>
      <h3>Initially owed: {info}</h3>
      <button onClick={() => navigate("/", { replace: true })}>
        Back to List
      </button>
    </div>
  );
};
