// import React from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SuperUserTicket() {
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
              <th>Sales Person Name</th>
              <th>Location</th>
              <th>Customer Name</th>

              <th>Customer Location</th>
              <th>Product Specification</th>
              <th>Quantity</th>
              <th>Make Preferred</th>
              <th>Model Preferred</th>
              <th>Target Price</th>
              <th>Remarks</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tickets, index) => {
              return (
                <tr key={index}>
                  <td>{tickets.salesPersonName}</td>

                  <td className="ticketWidth">{tickets.location}</td>
                  <td className="ticketWidth">{tickets.endCustomerName}</td>
                  <td className="ticketWidth">{tickets.endCustomerLocation}</td>
                  <td className="ticketWidth">
                    {tickets.productSpecification}
                  </td>
                  <td className="ticketWidth">{tickets.quantity}</td>
                  <td className="ticketWidth">{tickets.makePreferred}</td>
                  <td className="ticketWidth">{tickets.modelPreferred}</td>

                  <td className="ticketWidth">{tickets.targetPrice}</td>
                  <td className="ticketWidth">{tickets.remarks}</td>

                  <td>
                    <Link
                      to={`/editTicket/` + tickets.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>

                    {/* <button className="btn btn-sm btn-danger">delete</button> */}
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

export default SuperUserTicket;
