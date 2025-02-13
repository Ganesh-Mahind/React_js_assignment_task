// src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
