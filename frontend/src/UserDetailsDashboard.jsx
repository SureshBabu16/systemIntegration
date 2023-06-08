import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/getUsers")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert("Error");
        }
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
  //   {
  //     data.map((user, index) => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">User Dashboard</span>
            </a>
            <ul
              // key={index}
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/* <li>
                <Link
                  to={"/userDetailsDashboard/:id"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-ticket"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    User Dashboard
                  </span>
                </Link>
              </li> */}
              <li>
                <Link
                  to={"superUserTicket"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-ticket"></i>
                  <span className="ms-1 d-none d-sm-inline">View Tickets</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"riseTicket"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-ticket"></i>
                  <span className="ms-1 d-none d-sm-inline">Rise Tickets</span>
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
          <Outlet />
        </div>
      </div>
    </div>
  );
  //     });
  //   }
}

export default Dashboard;
