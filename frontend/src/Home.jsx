import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [newUserCount, setnewUserCount] = useState();
  const [newticketCount, setticketCount] = useState();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/superUserCount")
      .then((res) => {
        setAdminCount(res.data[0].superUserLogin);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/newUserCount")
      .then((res) => {
        setnewUserCount(res.data[0].newUser);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/newticketCount")
      .then((res) => {
        setticketCount(res.data[0].tickets);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Super User</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Users</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {newUserCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Ticket count</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {newticketCount}</h5>
          </div>
        </div>
      </div>

      {/* List of admin  */}
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admin</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
