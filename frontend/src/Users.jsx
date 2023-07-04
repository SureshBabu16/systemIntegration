import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useTable, useFilters } from "react-table";

function User() {
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
      .get("http://localhost:8081/getUsers")
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

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>User List</h3>
      </div>
      <Link to="/addUsers" className="btn btn-success">
        Add User
      </Link>
      <div className="mt-3 tableFixHead">
        <table className="table">
          <thead>
            <tr className="red">
              <th>ID</th>
              <th className="pointer" onClick={() => sorting("name")}>
                Name
              </th>
              {/* <th>Image</th> */}
              <th className="pointer" onClick={() => sorting("email")}>
                Email
              </th>
              <th className="pointer" onClick={() => sorting("Location")}>
                Location
              </th>
              {/* <th>Role</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  {/* <td>
                    {
                      <img
                        src={`http://localhost:8081/images/` + user.image}
                        alt=""
                        className="user_image"
                      />
                    }
                  </td> */}
                  <td>{user.email}</td>
                  <td>{user.Location}</td>
                  {/* <td>{user.role}</td> */}
                  {/* <td>{user.address}</td>
                  <td>{user.salary}</td> */}
                  <td>
                    {/* <Link
                      to={`/EditUser/` + user.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
                    <button
                      onClick={(e) => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button> */}
                    <Link
                      to={`/EditUser/` + user.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
                    <button
                      onClick={(e) => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>
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

export default User;
