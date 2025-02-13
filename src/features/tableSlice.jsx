// src/features/tableSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {  AccountName: "Alpha Corp", email: "contact@alphacorp.com", phone: "1234567890", website: "www.alphacorp.com", industry: "Technology", accountStatus: "Active", remark: "Top client" },
    {  AccountName: "Beta Inc", email: "info@betainc.com", phone: "2345678901", website: "www.betainc.com", industry: "Finance", accountStatus: "Inactive", remark: "Requires follow-up" },
    {  AccountName: "Gamma LLC", email: "sales@gammallc.com", phone: "3456789012", website: "www.gammallc.com", industry: "Healthcare", accountStatus: "Active", remark: "Potential growth" },
    {  AccountName: "Delta Ltd", email: "support@deltaltd.com", phone: "4567890123", website: "www.deltaltd.com", industry: "Retail", accountStatus: "Active", remark: "New account" },
    {  AccountName: "Epsilon Co", email: "hello@epsilonco.com", phone: "5678901234", website: "www.epsilonco.com", industry: "Manufacturing", accountStatus: "Inactive", remark: "On hold" },
]};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addRow } = tableSlice.actions;
export default tableSlice.reducer;
