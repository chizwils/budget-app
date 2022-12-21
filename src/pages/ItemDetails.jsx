import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { getDebt, listRecurrings } from "../graphql/queries";
import {
  updateDebt,
  createRecurring,
  deleteRecurring,
  updateRecurring,
} from "../graphql/mutations";
import { UpdateForm } from "./updateForm";

export const ItemDetails = () => {
  const item = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [total, setTotal] = useState();
  const fetchPayments = async () => {
    await API.graphql({
      query: listRecurrings,
      variables: { debtID: item.id },
    }).then((apiData) => {
      console.log(apiData, "pol");
      setAllPaidAmount(apiData.data.listRecurrings.items || 0);
    });

    //console.log(apiData.data.listRecurrings.items, "id");
    //setInfo(apiData?.data?.getDebt.initialAmountOwed || 0);

    // setAllPaidAmount(apiData.data.listRecurrings.items || 0);
    console.log(allPaidaMount, "io");
  };
  const fetchByID = async () => {
    const apiData = await API.graphql({
      query: getDebt,
      variables: { id: item.id },
    });
    //const {currentAmountOwed,initialAmountowed} = apiData.data?.getDebt
    // console.log(apiData.data.listRecurrings.items, "id");
    //setInfo(apiData?.data?.getDebt.initialAmountOwed || 0);
    //setTotal(apiData?.data?.getDebt.currentAmountOwed || 0);
    //setTotal(apiData?.data?.getDebt.currentAmountOwed || 0);
    setTotal(apiData?.data?.getDebt.currentAmountOwed);
    setAllPaidAmount(apiData?.data?.getDebt.payments.items);
    console.log(apiData, "data");
    setInfo(apiData.data?.getDebt);
    console.log(info, "info");
    //setAllPaidAmount(apiData.data.listRecurrings.items || 0);
    // console.log(allPaidaMount, "io");
  };
  useEffect(() => {
    fetchByID();
    //fetchPayments();
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
    setPaid(
      parseInt(e.target.value)
      // isEditMode: false,
      // timeInitialInput:  dateFormatter(Date.now())
      // timeModified: insertModifiedDateTimeHere
    );
    console.log(paid, "");
  };
  const onChangeEdit = (e) => {
    setEditedAmount(e.target.value);
  };

  // //calculate total
  useEffect(() => {
    console.log(allPaidaMount);
    setTotal(
      info?.initialAmountOwed -
        allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0)
    );
    //set total from current owed
  }, [allPaidaMount, total]);

  //when you press edit, An inbox should come and then you edit there and update

  const addAmount = async () => {
    //setAllPaidAmount((array) => [...array, paid]);
    //setTotal(total - allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0));
    await API.graphql({
      query: createRecurring,
      variables: {
        input: {
          amountPaid: paid,
          // createdAt: "Lorem ipsum dolor sit amet",
          // updatedAt: "Lorem ipsum dolor sit amet",
          debtID: item.id,
        },
      },
    });
    fetchByID();
    // console.log(allPaidaMount, "allpau");
    // console.log(
    //   allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0),
    //   "all"
    // );
    // setTotal(
    //   info?.initialAmountOwed -
    //     allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0)
    // );
    // fetchPayments();
    // console.log(total, "total");

    // }).then(() => {
    //   //update currentamountowed with totalremainging

    //   fetchPayments();
    //   setTotal(
    //     info?.initialAmountOwed -
    //       allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0)
    //   );
    // });
    // .then(() =>
    //   setTotal(
    //     info?.initialAmountOwed -
    //       allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0)
    //   )
    // );

    // fetchByID();
    setPaid("");
  };
  const deletePayment = async (id) => {
    await API.graphql({
      query: deleteRecurring,
      variables: {
        input: {
          id: id,
        },
      },
    });
    // fetchPayments();
    // setTotal(
    //   info?.initialAmountOwed -
    //     allPaidaMount?.reduce((a, b) => a + b.amountPaid, 0)
    // );
    // fetchPayments();
    fetchByID();
  };

  const updatePaymentById = async (id) => {
    //find payment bt
    await API.graphql({
      query: updateRecurring,
      variables: {
        input: {
          id: id,
          amountPaid: paid,
        },
      },
    }).then(() => {
      //update total
      fetchByID();
    });
  };

  const updatePayment = (id) => {
    console.log(id, "the");
  };
  //console.log(total, "total");
  return (
    <div>
      <h1>Name of company: {item.bill} </h1>

      <h3>Amount Owed: {item.price}</h3>
      <input
        onChange={onChange}
        placeholder="insert paid value"
        value={paid || ""}
      />
      <button onClick={addAmount}>Add Paying amount</button>

      <h1>List of payment</h1>
      {allPaidaMount &&
        allPaidaMount.map((item, idx) => {
          return (
            <div key={`${item.id}-${idx}`}>
              <UpdateForm
                onChange={onChange}
                currentState={item.amountPaid}
                update={() => updatePaymentById(item.id)}
                deleteThis={() => deletePayment(item.id)}
              />
            </div>
          );
        })}
      <h4>TOTAL LEFT: {total}</h4>
      <h3>Initially owed: {info?.initialAmountOwed}</h3>
      <button
        onClick={async () => {
          await API.graphql({
            query: updateDebt,
            variables: {
              input: {
                id: item.id,
                currentAmountOwed: total,
              },
            },
          });
          navigate("/", { replace: true });
        }}
      >
        Back to List
      </button>
    </div>
  );
};
