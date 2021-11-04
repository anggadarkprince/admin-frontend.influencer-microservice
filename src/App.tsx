import React from 'react';
import * as Icon from 'react-feather';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow">
        <a className="navbar-brand bg-dark text-light col-md-3 col-lg-2 me-0 px-3" href="#">
          <Icon.Activity size={24} className="me-2" />Adminer
        </a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <a className="nav-link px-3" href="#">
                Sign Out
                <Icon.LogOut size={16} className="ms-2" />
              </a>
            </div>
          </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <div className="position-sticky p-3">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center active" aria-current="page" href="#">
                    <Icon.Home size={16} className="me-2" />
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.File size={16} className="me-2" />
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.ShoppingCart size={16} className="me-2" />
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.Users size={16} className="me-2" />
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.BarChart2 size={16} className="me-2" />
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.Layers size={16} className="me-2" />
                    Integrations
                  </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a className="link-secondary" href="#" aria-label="Add a new report">
                  <Icon.PlusCircle size={16} className="me-2" />
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.FileText size={16} className="me-2" />
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.FileText size={16} className="me-2" />
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.FileText size={16} className="me-2" />
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="#">
                    <Icon.FileText size={16} className="me-2" />
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h3 fw-bold">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center">
                  <Icon.Calendar size={16} className="me-2" />
                  This week
                </button>
              </div>
            </div>

            <canvas className="my-4 w-100" id="myChart" width="900" height="250"></canvas>

            <h2 className="h4 fw-bold">Section title</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1,001</td>
                  <td>random</td>
                  <td>data</td>
                  <td>placeholder</td>
                  <td>text</td>
                </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
