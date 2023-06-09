// import React from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [data, setData] = useState([]);
  const [order, setorder] = useState("ASC");
  axios.defaults.withCredentials = true;
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/getTicketsAdmin")
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

  // var statusResult = document.getElementsByClassName("statusResult").innerText;
  // for (var i = 0; i <= statusResult.length; i++) {
  // console.log(statusResult[i]);
  //   statusResult[i]
  // }
  // console.log(statusResult);
  // if (statusResult === "Rejected") {

  // }

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
            <tr className="red">
              <th className="pointer" onClick={() => sorting("id")}>
                Ticket Person ID
              </th>
              <th className="pointer" onClick={() => sorting("createdId")}>
                Sales Person ID
              </th>
              <th
                className="pointer"
                onClick={() => sorting("salesPersonName")}
              >
                Sales Person Name
              </th>
              <th className="pointer" onClick={() => sorting("location")}>
                Location
              </th>
              <th
                className="pointer"
                onClick={() => sorting("endCustomerName")}
              >
                Customer Name
              </th>

              <th
                className="pointer"
                onClick={() => sorting("endCustomerLocation")}
              >
                Customer Location
              </th>
              <th
                className="pointer"
                id="changeColorHeader"
                onClick={() => sorting("endCustomerLocation")}
              >
                Raised Date
              </th>
              <th
                className="pointer"
                onClick={() => sorting("respondedDate2")}
                id="changeColorHeader"
              >
                Responded Date
              </th>
              <th
                className="pointer"
                onClick={() => sorting("productSpecification")}
              >
                Product Specification
              </th>
              <th className="pointer" onClick={() => sorting("quantity")}>
                Quantity
              </th>
              <th className="pointer" onClick={() => sorting("makePreferred")}>
                Make Preferred
              </th>
              <th className="pointer" onClick={() => sorting("modelPreferred")}>
                Model Preferred
              </th>
              <th className="pointer" onClick={() => sorting("targetPrice")}>
                Target Price
              </th>
              <th className="pointer" onClick={() => sorting("remarks")}>
                User Remarks
              </th>
              <th
                className="pointer"
                id="changeColorHeader"
                onClick={() => sorting("status")}
              >
                Status
              </th>

              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((tickets, index) => {
              return (
                <tr key={index}>
                  <td className="ticketWidth">{tickets.id}</td>
                  <td className="ticketWidth">{tickets.createdId}</td>
                  <td className="ticketWidth">{tickets.salesPersonName}</td>

                  <td className="ticketWidth">{tickets.location}</td>
                  <td className="ticketWidth">{tickets.endCustomerName}</td>
                  <td className="ticketWidth">{tickets.endCustomerLocation}</td>
                  <td className="ticketWidth dateColumn" id="changeColor">
                    {tickets.createdDate}
                  </td>
                  <td className="ticketWidth dateColumn" id="changeColor">
                    {tickets.respondedDate2}
                  </td>

                  <td className="ticketWidth">
                    {tickets.productSpecification}
                  </td>
                  <td className="ticketWidth">{tickets.quantity}</td>
                  <td className="ticketWidth">{tickets.makePreferred}</td>
                  <td className="ticketWidth">{tickets.modelPreferred}</td>

                  <td className="ticketWidth">{tickets.targetPrice}</td>
                  <td className="ticketWidth">{tickets.remarks}</td>
                  <td className="ticketWidth statusResult" id="changeColor">
                    {tickets.status}
                  </td>
                  {/* <td> */}
                  {/* <Link
                      to={`/editTicket/` + tickets.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link> */}

                  {/* <button className="btn btn-sm btn-danger">delete</button> */}
                  {/* </td> */}
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
