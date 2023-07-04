import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditSuperUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    location: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/getSuperUser/" + id)
      .then((res) => {
        const superUser = res.data.Result[0];
        setData({
          name: superUser.name,
          email: superUser.email,
          location: superUser.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/updateSuperUser/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(data);
          // window.location.reload(true);
          navigate("/superUser");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit Super Users</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="SuperUserName" className="form-label">
            Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            required
          />
          <label htmlFor="SuperUserEmail" className="form-label">
            Email :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            required
          />
          <label htmlFor="SuperUserLocation" className="form-label">
            Location :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            name="location"
            placeholder="Enter location"
            autoComplete="off"
            onChange={(e) => setData({ ...data, location: e.target.value })}
            value={data.location}
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

export default EditSuperUser;
