import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { fetchDebt, addDebt, delDebt } from "../api/debtApi";

export const fetchAllDebt = createAsyncThunk(
  "debt/fetchAllDebt",
  async (_, { rejectWithValue }) => {
    try {
      const list = await fetchDebt();
      console.log("im here too", list);
      return list;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);
//saveNewDebt

export const addNewDebt = createAsyncThunk(
  "debt/addNewDebt",
  async (bill, { rejectWithValue }) => {
    try {
      const list = await addDebt(bill);
      return list;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const deleteDebt = createAsyncThunk(
  "debt/deleteDebt",
  async (id, { rejectWithValue }) => {
    try {
      const list = await delDebt(id);
      console.log(list, "delete");
      return list;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

const { actions, reducer } = createSlice({
  name: "debt",
  initialState: {
    debts: [],
    currentRequestId: "",
    loading: "fin",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchAllDebt.fulfilled]: (state, { meta, payload }) => {
      console.log("i got here");

      if (meta.requestId === state.currentRequestId.requestId) {
        state.debts = payload;
        state.loading = "fin";
        state.currentRequestId = "";
      }
    },
    [fetchAllDebt.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.loading = "pending";
    },
    [fetchAllDebt.rejected]: (state, { meta, payload, error }) => {
      if (state.currentRequestId === meta) {
        state.currentRequestId = meta;
        state.loading = "fin";
        state.debts = payload;
        state.error = error;
      }
    },
    [addNewDebt.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.debts = payload;
        state.loading = "fin";
        state.currentRequestId = "";
      }
    },
    [addNewDebt.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.loading = "pending";
    },
    [addNewDebt.rejected]: (state, { meta, payload, error }) => {
      if (state.currentRequestId === meta) {
        state.currentRequestId = meta;
        state.loading = "fin";
        state.debts = payload;
        state.error = error;
      }
    },
    [deleteDebt.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.debts = payload;
        state.loading = "fin";
        state.currentRequestId = "";
      }
    },
    [deleteDebt.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.loading = "pending";
    },
    [deleteDebt.rejected]: (state, { meta, payload, error }) => {
      if (state.currentRequestId === meta) {
        state.currentRequestId = meta;
        state.loading = "fin";
        state.debts = payload;
        state.error = error;
      }
    },
  },
});

//export const { crDebt } = debtSlice.actions;
export default reducer;

//const selectSelf = (state) => state?.debts;
// export const debtSelector = createSelector(selectSelf, (state) =>
//   console.log(state, "state")
// );
