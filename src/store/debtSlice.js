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
      //console.log("here i am");
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
      console.log(list?.data?.deleteDebt?.id, "delete");
      return list?.data?.deleteDebt?.id;
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
      //if (meta.requestId === state.currentRequestId.requestId) {
      console.log(payload, state, "payload");
      state.debts = state?.debts?.filter((item) => item.id !== payload);

      state.loading = "fin";
      state.currentRequestId = "";
      //}
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
