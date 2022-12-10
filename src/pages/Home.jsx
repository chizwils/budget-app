import React, { useState } from "react";
import { API } from "aws-amplify";
import { createDebt, deleteDebt } from "../graphql/mutations";
import { listDebts } from "../graphql/queries";
import { Link } from "react-router-dom";
import { useEffect } from "react";
//create a redux to store all

export const Home = () => {
  const [state, setState] = useState();
  const [bill, setBill] = useState({ name: "", initialAmountOwed: "" });

  const onChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };
  const dateFormatter = (curr) => {
    const date = new Date(curr);
    return date.toString();
  };

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
  useEffect(() => {
    listingDebts();
  }, []);
  const listingDebts = async () => {
    const apiData = await API.graphql({ query: listDebts });
    console.log(apiData.data.listDebts.items, "hois");
    setState(apiData.data.listDebts.items);
    console.log(state);
  };

  const todoDetails = {
    id: "some_id",
  };

  //const deletedTodo = await API.graphql({ query: mudeleteTodo, variables: {input: todoDetails}});

  const handleClick = async (e) => {
    e.preventDefault();
    // setState([...state, bill])
    setBill({ bill: "", price: "" });
    await API.graphql({
      query: createDebt,
      variables: {
        input: {
          name: bill.name,
          createdAt: dateFormatter(Date.now()),
          currentAmountOwed: bill.initialAmountOwed,
          initialAmountOwed: bill.initialAmountOwed,
          isPaidOf: true,
          payments: [],
        },
      },
    });
    listingDebts();
    e.target.reset();
  };
  console.log(bill);
  const updateAmount = (id) => {
    console.log(id, "po");
    const newItem = state.map((item) => {
      if (item.id === id) {
        const updateItem = {
          ...item,
          isComplete: item.isComplete,
        };
        return updateItem;
      }
      return newItem;
    });
    setState(newItem);
  };
  const deletingDebt = async (id) => {
    console.log(id, "op");
    await API.graphql({
      query: deleteDebt,
      variables: { input: { id: id } },
    });
    listingDebts();
  };
  //console.log(state);
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
      <button onClick={listingDebts}>List notes</button>
      <h1>List of bills and prices</h1>

      <div>
        {state &&
          state.map((item) => {
            return (
              <>
                <Link to={`/company/${item.id}`}>
                  {" "}
                  <div>{item.name}</div>
                  <div>{item.initialAmountOwed}</div>
                </Link>

                <input
                  onChange={onChange}
                  placeholder={`update $${item.initialAmountOwed}`}
                  type="text"
                />

                <div>
                  <button onClick={() => updateAmount(item.id)}>edit</button>
                  <button onClick={() => deletingDebt(item.id)}>delete</button>
                </div>

                <hr></hr>
              </>
            );
          })}
      </div>
    </div>
  );
};
