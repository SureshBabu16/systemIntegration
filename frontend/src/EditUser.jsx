import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    Location: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  // console.log(a);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getUser/" + id)
      .then((res) => {
        // setData({
        //   ...data,
        //   name: a.value,
        //   email: b.value,
        //   Location: c.value,
        // });
        const User = res.data.Result[0];
        setData({
          name: User.name,
          email: User.email,
          Location: User.Location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);
  axios.defaults.withCredentials = true;
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
            required
          />
          <label htmlFor="UserName" className="form-label">
            Email :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            placeholder="Enter Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            required
          />
          <label htmlFor="UserName" className="form-label">
            Location :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLocation"
            placeholder="Enter Location"
            onChange={(e) => setData({ ...data, Location: e.target.value })}
            value={data.Location}
            required
          />
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
