import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: "1", name: "Alice", age: 25, email: "alice@example.com" },
    { id: "2", name: "Bob", age: 30, email: "bob@example.com" },
    { id: "3", name: "Charlie", age: 35, email: "charlie@example.com" },
    { id: "4", name: "David", age: 28, email: "david@example.com" },
    { id: "5", name: "Eve", age: 22, email: "eve@example.com" },
    { id: "6", name: "Frank", age: 40, email: "frank@example.com" },
    { id: "7", name: "Grace", age: 32, email: "grace@example.com" },
    
  ],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addRow } = tableSlice.actions;
export default tableSlice.reducer;
