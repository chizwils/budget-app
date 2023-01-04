import React, { useState } from "react";
import { API } from "aws-amplify";
import { createDebt, deleteDebt, updateDebt } from "../graphql/mutations";
import { listDebts } from "../graphql/queries";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UpdateForm } from "./updateForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDebt, addNewDebt, debtSelector } from "../store/debtSlice";
//create a redux to store all

export const Home = () => {
  const [state, setState] = useState();
  const [bill, setBill] = useState({ name: "", initialAmountOwed: "" });
  const [updateBill, setUpdateBill] = useState({
    name: "",
    initialAmountOwed: "",
  });
  const debt = useSelector((state) => state.debt.debts?.data?.listDebts.items);
  //const debt = useSelector(debtSelector);
  const dispatch = useDispatch();
  console.log(debt, "debts");

  const onChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };
  const dateFormatter = (curr) => {
    const date = new Date(curr);
    return date.toString();
  };

  useEffect(() => {
    //listingDebts();
    dispatch(fetchAllDebt());
  }, [dispatch]);
  const listingDebts = async () => {
    const apiData = await API.graphql({ query: listDebts });
    console.log(apiData.data.listDebts.items, "hois");
    setState(apiData.data.listDebts.items);
    console.log(state);
  };
  const onChangeEdit = (e) => {
    setUpdateBill({ ...updateBill, [e.target.name]: e.target.value });
  };
  console.log(updateBill, "update bill");
  const handleClick = async (e) => {
    dispatch(addNewDebt(bill));
    e.preventDefault();
    // await API.graphql({
    //   query: createDebt,
    //   variables: {
    //     input: {
    //       name: bill.name,
    //       createdAt: dateFormatter(Date.now()),
    //       currentAmountOwed: bill.initialAmountOwed,
    //       initialAmountOwed: bill.initialAmountOwed,
    //       isPaidOf: false,
    //     },
    //   },
    // }).then(() => setBill({ bill: "", price: "" }));
    setBill({ bill: "", price: "" });
    dispatch(fetchAllDebt());
    e.target.reset();
  };
  console.log(bill);

  const update = async (id) => {
    console.log(id, "po");

    await API.graphql({
      query: updateDebt,
      variables: {
        input: {
          id: id,
          initialAmountOwed: updateBill.initialAmountOwed,
          name: updateBill.name,
        },
      },
    }).then(() => listingDebts());
  };
  const delDebt = async (id) => {
    console.log(id, "op");
    await API.graphql({
      query: deleteDebt,
      variables: { input: { id: id } },
    });
    listingDebts();
  };

  const mock = {
    id: 1,
    status: "none",
  };

  return (
    <div>
      {/* <button
        onClick={() => {
          dispatch(crDebt(mock));
        }}
      >
        dispatch{" "}
      </button> */}
      <form onSubmit={handleClick}>
        <input
          onChange={onChange}
          name="name"
          placeholder="add bill name"
          value={bill.name}
        />
        <input
          onChange={onChange}
          name="initialAmountOwed"
          placeholder="insert price in number"
          value={bill.initialAmountOwed}
        />
        <button>Add</button>
      </form>
      <button onClick={listingDebts}>List notes</button>
      <h1>List of bills and prices</h1>

      <div>
        {debt &&
          debt.map((item, idx) => {
            return (
              <>
                <Link to={`/company/${item.id}`}>
                  {" "}
                  <div>{item.name}</div>
                  <div>{item.initialAmountOwed}</div>
                  <div>{item.currentAmountOwed}</div>
                </Link>
                <div key={`${item.id}-${idx}`}>
                  <UpdateForm
                    kind={"debt"}
                    itemName={item.name}
                    onChange={onChangeEdit}
                    currentState={item.initialAmountOwed}
                    update={() => update(item.id)}
                    deleteThis={() => delDebt(item.id)}
                  />
                </div>

                <hr></hr>
              </>
            );
          })}
      </div>
    </div>
  );
};
