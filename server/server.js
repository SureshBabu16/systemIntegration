import express from "express";
import mysql from "mysql";
import cors from "cors";

import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.get("/getUsers", (req, res) => {
  const sql = "SELECT * FROM newUser";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getSuperUsers", (req, res) => {
  const sql = "SELECT * FROM superUserLogin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getTickets/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tickets where id=?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getTicketsAdmin", (req, res) => {
  const sql = "SELECT * FROM tickets";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getApprovedTickets", (req, res) => {
  const sql =
    "SELECT * FROM tickets where ticketStatus!='' and ticketStatus!='Inprogress' and ticketStatus!='Open'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.get("/getRejectedTickets", (req, res) => {
  const sql = "SELECT * FROM tickets where status!='' and status!='Accepted'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.get("/getSuperTickets", (req, res) => {
  const sql =
    "SELECT * FROM tickets where status !='Rejected' and ticketStatus !='Closed'";
  // "SELECT * FROM tickets where status !='Rejected'";

  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/userGetTickets/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM tickets where createdId = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
    // console.log(result);
  });
});

// app.get("/userGetTickets007", (req, res) => {
//   const sql = "SELECT * FROM tickets";
//   const sql2 = "SELECT * FROM newUser";
//   con.query(sql, sql2, (err, result) => {
//     if (err) return res.json({ Error: "Get 2 table error in sql" });
//     return res.json({ Status: "Success", Result: result });
//   });
// });

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM newUser where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

// app.get("/getTicketId/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM newUser where id = ?";
//   con.query(sql, [id], (err, result) => {
//     if (err) return res.json({ Error: "get newUser error in sql" });
//     return res.json({ Status: "Success", Result: result });
//   });
// });

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "Update newUser set name = ?, email = ?, Location = ?  WHERE id = ?";
  con.query(
    sql,
    [req.body.name, req.body.email, req.body.Location, id],
    (err) => {
      if (err) return res.json({ Error: "Update newUser error in sql" });
      return res.json({ Status: "Success" });
    }
  );
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tickets where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "get tickets error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.get("/getSuperUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM superuserlogin where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "get tickets error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.put("/updateSuperUser/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "Update superuserlogin set name = ?, email = ?, location = ?   WHERE id = ?";
  con.query(
    sql,
    [req.body.name, req.body.email, req.body.location, id],
    (err, result) => {
      if (err) return res.json({ Error: "Update newUser error in sql" });
      return res.json({ Status: "Success" });
    }
  );
});

app.put("/updateTicket/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "Update tickets set productSpecification = ?, quantity = ?, makePreferred = ?, modelPreferred = ?, targetPrice = ?, remarks = ?, respondedDate2 = ?, ticketStatus=?  WHERE id = ?";
  console.log(req.body.id);

  con.query(
    sql,
    [
      req.body.productSpecification,
      req.body.quantity,
      req.body.makePreferred,
      req.body.modelPreferred,
      req.body.targetPrice,
      req.body.remarks,
      req.body.respondedDate2,
      req.body.ticketStatus,
      id,
    ],

    (err, result) => {
      if (err)
        return res.json({ Error: "Update productSpecification error in sql" });
      return res.json({ Status: "Success" });
    }
  );
});

// app.put("/updateTicket/:id", (req, res) => {
//   const id = req.params.id;

//   const sql = "UPDATE tickets SET productSpecification = ?  WHERE id = ?";

//   con.query(sql, [req.body.productSpecification, id], (err, result) => {
//     if (err)
//       return res.json({ Error: "Update productSpecification error in SQL" });
//     return res.json({ Status: "Success" });
//   });
// });

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM newUser WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete newUser error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.delete("/deleteSuperUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM superUserLogin WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete newUser error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.put("/updateTicketStatusReject/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Update tickets set status = 'Rejected' where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete tickets error in sql" });
    return res.json({ Status: "Success" });
  });
});

// app.put("/updateSuperUserRemark/:id", (req, res) => {
//   const { id } = req.params.id;
//   const { newData } = req.body.superUserRemark;

//   const updateQuery = `UPDATE your_table SET your_column = '${newData}' WHERE id = ${id}`;

//   connection.query(updateQuery, (err, result) => {
//     if (err) {
//       console.error("Error updating data: ", err, result);
//       res.sendStatus(500);
//       return;
//     }
//     console.log("Data updated");
//     res.sendStatus(200);
//   });
// });

// app.put("/updateSuperUserRemark/:id", (req, res) => {
//   const id = req.params.id;
//   const sql =
//     "Update tickets set superUserRemark = '?'is not NULL WHERE id = ?";

//   con.query(sql, [req.body.superUserRemark, id], (err, result) => {
//     if (err)
//       return res.json({
//         Error: "Update Super user Remark error in sql",
//       });
//     return res.json({ Status: "Success" });
//   });
// });

app.put("/updateSuperUserRemark/:id", (req, res) => {
  const id = req.params.id;
  const superUserRemark = req.body.superUserRemark;
  const sql = "UPDATE tickets SET superUserRemark = ? WHERE id = ?";

  con.query(sql, [superUserRemark, id], (err, result) => {
    if (err) {
      return res.json({
        Error: "Update Super User Remark error in SQL",
      });
    }
    return res.json({ Status: "Success" });
  });
});

// app.put("/updateUser/:id", (req, res) => {
//   const id = req.params.id;
//   const sql =
//     "Update newUser set name = ?, email = ?, location = ?  WHERE id = ?";
//   con.query(
//     sql,
//     [req.body.name, req.body.email, req.body.location, id],
//     (err) => {
//       if (err) return res.json({ Error: "Update newUser error in sql" });
//       return res.json({ Status: "Success" });
//     }
//   );
// });

app.put("/updateTicketStatusApproved/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Update tickets set status = 'Accepted' where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete tickets error in sql" });
    return res.json({ Status: "Success", result });
  });
});

app.put("/updateTicketStatusOpen/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Update tickets set ticketStatus = 'Open' where id = ?";
  // const sql =
  //   "INSERT INTO tickets (`ticketStatus`) VALUES (`Open`) where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete tickets error in sql" });
    return res.json({ Status: "Success", result });
  });
});

app.put("/updateTicketStatusDate/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    // "UPDATE tickets SET respondedDate2 = CONCAT(CURDATE(), ' ' , time(mytime)) WHERE id = ?";
    "Update tickets set respondedDate2 = SYSDATE() where id=?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete tickets error in sql" });
    return res.json({ Status: "Success", result });
  });
});

// app.post("/addUsers", upload.single("image"), (req, res) => {
app.post("/addUsers", (req, res) => {
  const sql =
    "INSERT INTO newUser (`name`,`email`,`password`,`location`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.location,
      // req.body.role,
      // req.file.filename,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inside singup query" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/addSuperUsers", (req, res) => {
  // app.post("/addUsers", (req, res) => {
  const sql =
    "INSERT INTO superUserLogin (`name`,`email`,`password`, `location`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      // req.body.role,
      req.body.location,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inside singup query" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/riseTicket", (req, res) => {
  // const sql = "INSERT INTO tickets ( `customerName`, `details` ) VALUES ( ? )";
  // const values = [req.body.customerName, req.body.details];

  const sql =
    "INSERT INTO tickets ( `createdId`,`salesPersonName`, `location`, `endCustomerName` , `endCustomerLocation` , `productSpecification` , `quantity` , `makePreferred` , `modelPreferred` , `targetPrice` , `remarks`, `createdDate` ) VALUES ( ? )";
  const values = [
    req.body.createdId,
    req.body.salesPersonName,
    req.body.location,
    req.body.endCustomerName,
    req.body.endCustomerLocation,
    req.body.productSpecification,
    req.body.quantity,
    req.body.makePreferred,
    req.body.modelPreferred,
    req.body.targetPrice,
    req.body.remarks,
    req.body.createdDate,
  ];
  // const userInfo = [createdId: getUserId.value,]
  con.query(sql, [values], (err, result) => {
    if (err)
      return res.json({
        Error: "Error in Running Query",
        err,
        result,
        values,
      });
    return res.json({ Status: "Success" });
  });
  // };
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/ticketActiveCount", (req, res) => {
  const sql =
    "Select count(*) as tickets from tickets where ticketStatus = 'Open' OR ticketStatus = 'Inprogress'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/ticketApprovedCount", (req, res) => {
  const sql =
    "Select count(*) as tickets from tickets where ticketStatus = 'Closed'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});
app.get("/ticketRejectedCount", (req, res) => {
  const sql =
    "Select count(*) as tickets from tickets where status = 'Rejected'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/superUserCount", (req, res) => {
  const sql = "Select count(id) as superUserLogin from superUserLogin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/newUserCount", (req, res) => {
  const sql = "Select count(id) as newUser from newUser";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/newticketCount", (req, res) => {
  const sql = "Select count(id) as tickets from tickets";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.post("/login", (req, res) => {
  const loginUser = "Admin Login";
  const sql = "SELECT * FROM admin Where email = ? AND  password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success", loginUser });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.post("/superUserLogin", (req, res) => {
  const loginUser = "Super User Login";
  const sql = "SELECT * FROM superUserLogin Where email = ? ";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error" });
          // const id = result[0].id;
          const token = jwt.sign(
            { role: "user", id: result[0].id },
            "jwt-secret-key",
            {
              expiresIn: "1d",
            }
          );
          res.cookie("token", token);
          return res.json({ Status: "Success", id: result[0].id, loginUser });
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.post("/userlogin", (req, res) => {
  const loginUser = "User Login";
  const sql = "SELECT * FROM newUser Where email = ? ";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error" });
          // const id = result[0].id;
          const token = jwt.sign(
            { role: "user", id: result[0].id },
            "jwt-secret-key",
            {
              expiresIn: "1d",
            }
          );
          res.cookie("token", token);
          return res.json({ Status: "Success", id: result[0].id, loginUser });
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(8081, () => {
  console.log("Running");
});
