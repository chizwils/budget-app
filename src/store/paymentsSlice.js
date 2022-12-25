import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "payments ",
  initialState: {
    Payments: [],
  },
  reducers: {
    createPayments: () => {},
    deletePayments: () => {},
    updatePayments: () => {},
  },
});
