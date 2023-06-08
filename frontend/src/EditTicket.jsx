import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [data, setData] = useState({
    details: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();
  const a = document.getElementById("inputDetails");

  // console.log(a);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getTicket/" + id)
      .then((res) => {
        setData({
          ...data,
          //   name: res.data.Result[0].name,
          productSpecification: a.value,
        });
      })
      .catch((err) => console.log(err));
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/updateTicket/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(data);

          navigate("/superUserDetails/:id");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Users</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="productSpecification" className="form-label">
            Product Specification :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputProductSpecification"
            placeholder="Enter Name"
            onChange={(e) =>
              setData({ ...data, productSpecification: e.target.value })
            }
            value={data.productSpecification}
          />

          {/* <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            onChange={handleChange}
            value={newEmpty}
          /> */}
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

export default EditUser;
