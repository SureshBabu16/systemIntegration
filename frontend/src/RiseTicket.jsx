import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RiseTicket() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [user, setUser] = useState([]);
  // console.log(user);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getUser/" + id)
      .then((res) => setUser(res.data.Result[0]))
      .catch((err) => console.log(err));
  });
  const [data, setTicket] = useState({
    createdId: "",
    salesPersonName: "",
    location: "",
    endCustomerName: "",
    endCustomerLocation: "",
    productSpecification: "",
    quantity: "",
    makePreferred: "",
    modelPreferred: "",
    targetPrice: "",
    remarks: "",
  });
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  // var salesPersonNameId = document.getElementById("salesPersonNameId");
  // var endCustomerLocationId = document.getElementById("endCustomerLocationId");
  // var createdId = document.getElementById("userIdHidden");
  var getUserId = document.getElementById("getUserId");
  var getUserName = document.getElementById("getUserName");

  var getUserLocation = document.getElementById("getUserLocation");
  var createdDateId = document.getElementById("createdDateId");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    // console.log(data);
    // console.log(getUserId.value);
    // console.log(getUserName.value);

    // console.log(getUserLocation.value);

    // console.log(createdId.value);
    // formdata.append((user.name = data.salesPersonName));
    // data.location = user.Location;
    // formdata.append("createdId", createdId.value);
    // formdata.append("salesPersonName", data.salesPersonName);
    // formdata.append("location", data.location);
    // formdata.append(("createdId", getUserId.value));
    // formdata.append(("salesPersonName", getUserName.value));
    // formdata.append(("location", getUserLocation.value));
    data.createdId = getUserId.value;
    data.salesPersonName = getUserName.value;
    data.location = getUserLocation.value;
    console.log(data);
    data.createdDate = createdDateId.value;
    formdata.append("endCustomerName", data.endCustomerName);
    formdata.append("endCustomerLocation", data.endCustomerLocation);
    formdata.append("productSpecification", data.productSpecification);
    formdata.append("quantity", data.quantity);
    formdata.append("makePreferred", data.makePreferred);
    formdata.append("modelPreferred", data.modelPreferred);
    formdata.append("targetPrice", data.targetPrice);
    formdata.append("remarks", data.remarks);
    // console.log(data);
    // formdata: data;
    // console.log(formdata);
    axios
      .post(
        "http://localhost:8081/riseTicket",
        data,
        getUserId.value,
        getUserName.value,
        getUserLocation.value,
        createdDateId.value
      )
      .then((res) => {
        console.log(data);
        // const id = res.data.id;
        navigate("/userDetailsDashboard/" + id);
      })
      .catch((err) => console.log(err));
    // alert(data.customerName);
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4 riseTicketForm">
      <h2>Rise Ticket</h2>
      <form className="row g-3 w-50 " onSubmit={handleSubmit}>
        {/* <div className="col-12">
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
        </div> */}
        {/* <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            Created ID
          </label>
          <input
            type="text"
            className="form-control"
            id="salesPersonNameId"
            value={user.name}
            // placeholder="Enter Sales Person Name"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, salesPersonName: e.target.value })
            }
          />
        </div> */}
        <input
          type="text"
          className="form-control getUserId"
          id="getUserId"
          defaultValue={user.id}
          autoComplete="off"
          onChange={(e) => setTicket({ ...data, createdId: e.target.value })}
        />
        <input
          type="text"
          className="form-control getUserId"
          id="createdDateId"
          // defaultValue={user.id}
          value={new Date().toLocaleString() + ""}
          autoComplete="off"
          onChange={(e) => setTicket({ ...data, createdDate: e.target.value })}
        />

        {/* <h6>
          Created ID: <span id="getUserId">{user.id}</span>
        </h6>
        <h6>
          Sales Person Name: <span id="getUserName">{user.name}</span>
        </h6>

        <h6>
          Sales Person Location:{" "}
          <span id="getUserLocation">{user.Location}</span>
        </h6> */}

        <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            Sales Person Name
          </label>
          <input
            type="text"
            className="form-control"
            id="getUserName"
            value={user.name}
            placeholder="Enter Sales Person Name"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, salesPersonName: e.target.value })
            }
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="getUserLocation"
            value={user.Location}
            autoComplete="off"
            onChange={(e) => setTicket({ ...data, location: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            End Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="endCustomerName"
            placeholder="Enter End Customer Name"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, endCustomerName: e.target.value })
            }
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            End Customer Location
          </label>
          <select
            name="state"
            id="state"
            className="dropdownSelect"
            // defaultValue="Select State"
            onChange={(e) =>
              setTicket({ ...data, endCustomerLocation: e.target.value })
            }
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadar and Nagar Haveli">
              Dadar and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            Product Specification
          </label>
          <textarea
            type="text"
            className="form-control"
            id="productSpecification"
            placeholder="Enter Product Specification"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, productSpecification: e.target.value })
            }
          />
        </div>

        <div className="col-6">
          <label htmlFor="inputName" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            placeholder="Enter Quantity"
            autoComplete="off"
            onChange={(e) => setTicket({ ...data, quantity: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Make Preferred
          </label>
          <input
            type="text"
            className="form-control"
            id="makePreferred"
            placeholder="Enter Make Preferred"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, makePreferred: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Model Preferred
          </label>
          <input
            type="text"
            className="form-control"
            id="modelPreferred"
            placeholder="Enter Model Preferred"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, modelPreferred: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Target Price
          </label>
          <input
            type="text"
            className="form-control"
            id="targetPrice"
            placeholder="Enter Target Price"
            autoComplete="off"
            onChange={(e) =>
              setTicket({ ...data, targetPrice: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            User Remarks
          </label>
          <textarea
            type="text"
            className="form-control"
            id="remarks"
            placeholder="Enter Remarks"
            autoComplete="off"
            onChange={(e) => setTicket({ ...data, remarks: e.target.value })}
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
