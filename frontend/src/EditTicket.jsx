import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTicket() {
  const [data, setData] = useState({
    productSpecification: "",
    quantity: "",
    makePreferred: "",
    modelPreferred: "",
    targetPrice: "",
    remarks: "",
    ticketStatus: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { id } = useParams();

  var respondedDateId = document.getElementById("respondedDate");
  useEffect(() => {
    axios
      .get(`http://localhost:8081/getTickets/` + id)
      .then((res) => {
        // setData(res.data);
        setData({
          ...data,
          productSpecification: res.data.Result[0].productSpecification,
          quantity: res.data.Result[0].quantity,
          makePreferred: res.data.Result[0].makePreferred,
          modelPreferred: res.data.Result[0].modelPreferred,
          targetPrice: res.data.Result[0].targetPrice,
          remarks: res.data.Result[0].remarks,
          ticketStatus: res.data.Result[0].ticketStatus,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    data.respondedDate2 = respondedDateId.value;
    axios
      .put(
        "http://localhost:8081/updateTicket/" + id,
        data,
        respondedDateId.value
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(data);

          navigate("/superUserDetails/" + id);
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Users</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12 " id="respondedDate2">
          <label htmlFor="productSpecification" className="form-label">
            Responded Date :
          </label>
          <input
            type="text"
            className="form-control"
            id="respondedDate"
            value={new Date().toLocaleString() + ""}
          />
        </div>
        <div className="col-12">
          <label htmlFor="productSpecification" className="form-label">
            Product Specification :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputProductSpecification"
            name="productSpecification"
            placeholder="Enter Product Specification"
            autoComplete="off"
            value={data.productSpecification}
            onChange={(e) =>
              setData({ ...data, productSpecification: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label htmlFor="productQuantity" className="form-label">
            Quantity :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputQuantity"
            placeholder="Enter Quantity"
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            value={data.quantity}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="productMakePreferred" className="form-label">
            Make Preferred :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputMakePreferred"
            placeholder="Enter Make Preferred"
            onChange={(e) =>
              setData({ ...data, makePreferred: e.target.value })
            }
            value={data.makePreferred}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="productModelPreferred" className="form-label">
            Model Preferred :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputModelPreferred"
            placeholder="Enter Model Preferred"
            onChange={(e) =>
              setData({ ...data, modelPreferred: e.target.value })
            }
            value={data.modelPreferred}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="productTargetPrice" className="form-label">
            Target Price :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTargetPrice"
            placeholder="Enter Target Price"
            onChange={(e) => setData({ ...data, targetPrice: e.target.value })}
            value={data.targetPrice}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="productRemarks" className="form-label">
            User Remarks :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputRemarks"
            placeholder="Enter User Remarks"
            onChange={(e) => setData({ ...data, remarks: e.target.value })}
            value={data.remarks}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="sel2" className="form-label">
            Ticket Status
          </label>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, ticketStatus: e.target.value })}
            value={data.ticketStatus}
          >
            <option value="Open">Open</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTicket;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function EditUser() {
//   const [data, setData] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .put(`http://localhost:8081/updateTicket/` + id, data)
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           console.log(data);
//           navigate(`/superUserDetails/` + id);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleInputChange = (event) => {
//     const { productSpecification, value } = event.target;
//     setData({ ...data, [productSpecification]: value });
//   };

//   useEffect(() => {
//     // Fetch ticket data and set it to the state (data)
//     axios
//       .get(`http://localhost:8081/getTickets/` + id)
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   return (
//     <div className="d-flex flex-column align-items-center pt-4">
//       <h2>Edit Tickets</h2>
//       <form className="row g-3 w-50" onSubmit={handleSubmit}>
{
  /* <div className="col-12">
          <label htmlFor="respondedDate" className="form-label">
            Responded Date:
          </label>
          <input
            type="text"
            className="form-control"
            id="respondedDate"
            name="respondedDate"
            onChange={handleInputChange}
            value={data.respondedDate || ""}
          />
        </div> */
}
{
  /* <div className="col-12">
          <label htmlFor="inputProductSpecification" className="form-label">
            Product Specification:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputProductSpecification"
            name="productSpecification"
            placeholder="Enter Name"
            onChange={handleInputChange}
            value={data.productSpecification || ""}
          />
        </div> */
}
{
  /* <div className="col-12">
          <label htmlFor="productQuantity" className="form-label">
            Quantity :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputQuantity"
            placeholder="Enter Name"
            onChange={handleInputChange}
            value={data.productSpecification || ""}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputMakePreferred" className="form-label">
            Make Preferred:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputMakePreferred"
            name="makePreferred"
            placeholder="Enter Name"
            onChange={handleInputChange}
            value={data.makePreferred || ""}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputModelPreferred" className="form-label">
            Model Preferred:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputModelPreferred"
            name="modelPreferred"
            placeholder="Enter Name"
            onChange={handleInputChange}
            value={data.modelPreferred || ""}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputTargetPrice" className="form-label">
            Target Price:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTargetPrice"
            name="targetPrice"
            placeholder="Enter Name"
            onChange={handleInputChange}
            value={data.targetPrice || ""}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputRemarks" className="form-label">
            User Remarks:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputRemarks"
            name="remarks"
            placeholder="Enter Name"
            onChange={handleInputChange}
            value={data.remarks || ""}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="ticketStatus" className="form-label">
            Ticket Status:
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="ticketStatus"
            name="ticketStatus"
            onChange={handleInputChange}
            value={data.ticketStatus || ""}
          >
            <option value="Open">Open</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Closed">Closed</option>
          </select>
        </div> */
}
{
  /* <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser; */
}
