import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDebt } from "../api/debtApi";

export const fetchAllDebt = createAsyncThunk(
  "todo/fetchAllDebt",
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
  },
});

//export const { crDebt } = debtSlice.actions;
export default reducer;
