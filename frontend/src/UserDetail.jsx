import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [newticketCount, setticketCount] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => setUser(res.data.Result[0]))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8081/newticketCount")
      .then((res) => {
        setticketCount(res.data[0].tickets);
      })
      .catch((err) => console.log(err));
  });

  // const handleLogout = () => {
  //   axios
  //     .get("http://localhost:8081/logout")
  //     .then((res) => {
  //       navigate("/login");
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:8081/images/` + user.image}
          alt=""
          className="userImg"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Active Tickets: {newticketCount}</h3>
        </div>
        {/* <div>
          <Link to="/riseTicket" className="btn btn-success  me-2">
            Rise Ticket
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Profile;
