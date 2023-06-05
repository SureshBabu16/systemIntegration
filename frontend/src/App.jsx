import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";
import Profile from "./Profile";
import Home from "./Home";
import AddUsers from "./AddUsers";
import EditUser from "./EditUser";

import UserDetail from "./UserDetail";
import RiseTicket from "./RiseTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/addUsers" element={<AddUsers />}></Route>
          <Route path="/EditUser/:id" element={<EditUser />}></Route>
        </Route>
        <Route exact path="/login" element={<Login />}></Route>

        <Route path="/userDetail/:id" element={<UserDetail />}></Route>
        <Route path="/riseTicket" element={<RiseTicket />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

// function App() {
//   const isLoggedIn = window.localStorage.getItem("loggedIn");
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route exact path="/" element={isLoggedIn == "true"} />
//           <Route path="/login" element={<Login />} />
//           <Route exact path="/" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
