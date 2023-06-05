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

app.get("/getTickets", (req, res) => {
  const sql = "SELECT * FROM tickets";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM newUser where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "get newUser error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Update newUser set name = ?  WHERE id = ?";
  console.log(req.body.id);
  con.query(sql, [req.body.name, id], (err, result) => {
    if (err) return res.json({ Error: "Update newUser error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM newUser WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete newUser error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.post("/addUsers", upload.single("image"), (req, res) => {
  // app.post("/addUsers", (req, res) => {
  const sql =
    "INSERT INTO newUser (`name`,`email`,`password`,`image`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      // req.body.role,
      req.file.filename,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inside singup query" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/riseTicket", (req, res) => {
  // const sql2 = ALTER TABLE tickets MODIFY customerName VARCHAR(50);;
  // const sql3 = "ALTER TABLE tickets MODIFY details VARCHAR(5000);";
  const sql = "INSERT INTO tickets ( `customerName`, `details` ) VALUES ( ? )";
  // () => {
  const values = [req.body.customerName, req.body.details];
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

app.get("/adminCount", (req, res) => {
  const sql = "Select count(id) as admin from admin";
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
