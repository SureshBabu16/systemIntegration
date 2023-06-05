import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RiseTicket() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => setUser(res.data.Result[0]))
      .catch((err) => console.log(err));
  });
  const [data, setTicket] = useState({
    customerName: "",
    details: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("customerName", data.customerName);
    formdata.append("details", data.details);
    console.log(data);
    // formdata: data;
    console.log(formdata);
    axios
      .post("http://localhost:8081/riseTicket", data)
      .then((res) => {
        console.log(res);
        // const id = res.data.id;
        navigate("/");
      })
      .catch((err) => console.log(err));
    // alert(data.customerName);
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Rise Ticket</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ticketName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, customerName: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Details
          </label>
          <textarea
            className="form-control"
            id="ticketDetails"
            placeholder="Enter Details"
            autoComplete="off"
            onChange={(e) => setTicket({ ...data, details: e.target.value })}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            // onClick={handleSubmit}
            className="btn btn-primary"
          >
            Rise Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

export default RiseTicket;
