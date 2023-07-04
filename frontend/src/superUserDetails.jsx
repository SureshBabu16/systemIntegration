import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function SuperUserDetails() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [activeCount, setActiveCount] = useState();
  const [approvedCount, serApprovedCount] = useState();
  const [rejectedCount, setrejectedCount] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/ticketActiveCount")
      .then((res) => {
        setActiveCount(res.data[0].tickets);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8081/ticketApprovedCount")
      .then((res) => {
        serApprovedCount(res.data[0].tickets);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/ticketRejectedCount")
      .then((res) => {
        setrejectedCount(res.data[0].tickets);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  {
    // data.map((superUser, index) => {
    // console.log(superUser);
    return (
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">
                  Super User Dashboard
                </span>
              </div>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                {/* <li className="nav-item">
                <button className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-speedometer2"></i>
                  <span className="ms-1 d-none d-sm-inline ">Dashboard</span>
                </button>
              </li> */}
                {/* <li>
                <Link
                  to="/users"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">Users</span>
                </Link>
              </li> */}
                {/* <li>
                <Link
                  to={"/superUserTicket"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-speedometer2"></i>
                  <span className="ms-1 d-none d-sm-inline">Tickets</span>
                </Link>
              </li> */}
                <li>
                  <Link
                    to={"superUserTicket"}
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-person"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Active Tickets
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="superApprovedTicket"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-person"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Closed Tickets
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="superRejectedTicket"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-person"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Rejected Tickets
                    </span>
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <a href="#" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-power"></i>
                    <span className="ms-1 d-none d-sm-inline">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>System Integration</h4>
            </div>
            <div>
              <div className="p-3 d-flex justify-content-around mt-3">
                <div
                  className="px-3 pt-2 pb-3 border shadow-sm w-25"
                  id="changeColorHeader"
                >
                  <div className="text-center pb-1">
                    <h4>Active Ticket</h4>
                  </div>
                  <hr />
                  <div className="">
                    <h5>Total: {activeCount}</h5>
                  </div>
                </div>
                <div
                  className="px-3 pt-2 pb-3 border shadow-sm w-25"
                  id="changeColor"
                >
                  <div className="text-center pb-1">
                    <h4>Approved Ticket</h4>
                  </div>
                  <hr />
                  <div className="">
                    <h5>Total: {approvedCount}</h5>
                  </div>
                </div>
                <div
                  className="px-3 pt-2 pb-3 border shadow-sm w-25"
                  id="changeColorHeader"
                >
                  <div className="text-center pb-1">
                    <h4>Rejected count</h4>
                  </div>
                  <hr />
                  <div className="">
                    <h5>Total: {rejectedCount}</h5>
                  </div>
                </div>
              </div>

              {/* List of admin  */}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    );
    // });
  }
}

export default SuperUserDetails;
