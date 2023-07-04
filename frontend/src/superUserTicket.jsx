// import React from "react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function SuperUserTicket() {
  const [data, setData] = useState([]);

  const [order, setorder] = useState("ASC");

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
  var buttonHidden = document.getElementsByClassName("buttonHidden");
  useEffect(() => {
    axios
      .get("http://localhost:8081/getSuperTickets")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          for (var i = 0; i <= res.data.Result.length; i++) {
            if (res.data.Result[i].ticketStatus === "") {
            } else {
              buttonHidden[i].innerHTML = null;

              res.data.Result[i].status = "Accepted";
            }
          }
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const handleReject = (id) => {
    const promtRemark = window.prompt("Reason for Rejection");

    axios
      .put("http://localhost:8081/updateSuperUserRemark/" + id, {
        superUserRemark: promtRemark,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        }
      })
      .catch((err) => console.log(err));

    axios
      .put("http://localhost:8081/updateTicketStatusReject/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
    axios
      .put("http://localhost:8081/updateTicketStatusDate/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleApproved = (id) => {
    axios
      .put("http://localhost:8081/updateTicketStatusApproved/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
    axios
      .put("http://localhost:8081/updateTicketStatusOpen/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
    axios
      .put("http://localhost:8081/updateTicketStatusDate/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Ticket List</h3>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr className="red">
              <th>Ticket ID</th>
              <th>Sales Person ID</th>
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
                onClick={() => sorting("risedDate")}
                id="changeColorHeader"
              >
                Raised Date
              </th>
              <th className="pointer" onClick={() => sorting("risedDate")}>
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
              <th className="pointer" onClick={() => sorting("status")}>
                Enquiry Status
              </th>
              <th className="pointer" onClick={() => sorting("ticketStatus")}>
                Ticket Status
              </th>
              <th>Action</th>
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
                  <td className="ticketWidth" id="changeColor">
                    {tickets.createdDate}
                  </td>
                  <td className="ticketWidth">{tickets.respondedDate2}</td>
                  <td className="ticketWidth">
                    {tickets.productSpecification}
                  </td>
                  <td className="ticketWidth">{tickets.quantity}</td>
                  <td className="ticketWidth">{tickets.makePreferred}</td>
                  <td className="ticketWidth">{tickets.modelPreferred}</td>

                  <td className="ticketWidth">{tickets.targetPrice}</td>
                  <td className="ticketWidth">{tickets.remarks}</td>
                  <td className="statusColumnTicket" id="changeField">
                    {tickets.status}

                    <div className="buttonHidden">
                      <button
                        onClick={(e) => handleApproved(tickets.id)}
                        className=" btn primary"
                      >
                        <i className="fs-4 bi-check-circle-fill"></i>
                      </button>
                      <button
                        onClick={(e) => handleReject(tickets.id)}
                        className=" btn primary"
                      >
                        <i className="fs-4 bi-x-circle-fill"></i>
                      </button>
                    </div>
                  </td>
                  <td className="ticketWidth">{tickets.ticketStatus}</td>
                  <td>
                    <Link
                      to={`/editTicket/` + tickets.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
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
