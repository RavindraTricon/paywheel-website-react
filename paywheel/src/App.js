import React from 'react';
import './App.css';
import Header from './Header/Header'
import Navigation from './Navigation/Navigation';
import Dashboard from './Dashboard/Dashboard'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <Navigation/>
      <Dashboard/>
      
    </div>
  );
}

export default App;
