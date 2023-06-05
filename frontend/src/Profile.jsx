// import React from "react";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getTickets")
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

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Ticket List</h3>
      </div>
      {/* <Link to="/addUsers" className="btn btn-success">
        Add User
      </Link> */}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tickets, index) => {
              return (
                <tr key={index}>
                  <td>{tickets.customerName}</td>

                  <td className="ticketWidth">{tickets.details}</td>

                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      edit
                    </button>

                    <button className="btn btn-sm btn-danger">delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
