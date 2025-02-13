import React from "react";
import DataTable from "./components/DataTable";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css"; 

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>React Table Application</h1>
        <DataTable />
      </div>
    </Provider>
  );
}

export default App;
