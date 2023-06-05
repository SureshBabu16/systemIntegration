import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useTable, useFilters } from "react-table";

function User() {
  const [data, setData] = useState([]);

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
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              {/* <th>Role</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>
                    {
                      <img
                        src={`http://localhost:8081/images/` + user.image}
                        alt=""
                        className="user_image"
                      />
                    }
                  </td>
                  <td>{user.email}</td>
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
