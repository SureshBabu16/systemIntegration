import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [data, setData] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();
  const a = document.getElementById("inputName");

  // console.log(a);
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        setData({
          ...data,
          // name: res.data.Result[0].name,
          name: a.value,
        });
      })
      .catch((err) => console.log(err));
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/updateUser/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(data);

          navigate("/users");
        }
      })
      .catch((err) => console.log(err));
  };

  // console.log(data.name);
  // const [newEmpty, setDataEmpty] = useState("");

  // const handleChange = (event) => {
  //   setDataEmpty(event.target.value);
  //   setData({
  //     [event.target.name]: event.target.value,
  //   });

  // setData({
  //   ...data,
  //   name: res.data.Result[0].name,
  // });

  // console.log(event.data);
  // console.log(event.target.name);
  // console.log(event.target.id);
  // };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Users</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="UserName" className="form-label">
            Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
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
