import React, { useState } from "react";
import { API } from "aws-amplify";
import { createDebt, updateDebt } from "../graphql/mutations";
import { listDebts } from "../graphql/queries";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UpdateForm } from "./updateForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDebt, addNewDebt, deleteDebt } from "../store/debtSlice";
//create a redux to store all

export const Home = () => {
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

  useEffect(() => {
    //listingDebts();
    dispatch(fetchAllDebt());
  }, [dispatch]);

  const onChangeEdit = (e) => {
    setUpdateBill({ ...updateBill, [e.target.name]: e.target.value });
  };
  //console.log(updateBill, "update bill");
  const handleClick = async (e) => {
    dispatch(addNewDebt(bill));
    e.preventDefault();
    setBill({ name: "", initialAmountOwed: "" });
    dispatch(fetchAllDebt());
    e.target.reset();
  };
  console.log(bill);

  const update = async (id) => {
    console.log(id, "po");

    dispatch(deleteDebt(id));
    dispatch(fetchAllDebt());
  };
  const delDebt = async (id) => {
    console.log(id, "op");
    dispatch(deleteDebt(id));
    dispatch(fetchAllDebt());
  };

  const mock = {
    id: 1,
    status: "none",
  };

  return (
    <div>
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
