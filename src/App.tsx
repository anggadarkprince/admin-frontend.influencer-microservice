import React from 'react';
import './App.css';
import Header from "./secure/components/Header";
import Sidebar from "./secure/components/Sidebar";
import Dashboard from "./secure/Dashboard";
import {Routes, Route} from "react-router-dom";
import Users from "./secure/Users";

function App() {
  return (
    <div className="App">
      <Header/>

      <div className="container-fluid">
        <div className="row">
          <Sidebar/>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
                <Route path={'/'} element={<Dashboard/>} />
                <Route path={'/users'} element={<Users/>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
