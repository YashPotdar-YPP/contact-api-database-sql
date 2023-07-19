const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mySql = require("mysql2");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const db = mySql.createConnection({
  host: "localhost",
  password: "Admin@123",
  user: "root",
  database: "contactapi",
});

db.connect((err)=>{
  if (err) {
    console.log("Connection failed");
  } else {
    console.log("Connection Successful");
  }
})

app.get("/getContact", (req, res) => {
  const getContact = "SELECT * FROM contactapi.api";
  db.query(getContact, (e, result) => {
    res.send(result);
  });
});

app.post("/addContact", (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const sqlInsert = "INSERT INTO contactapi.api(firstName,lastName,phoneNumber) VALUES (?,?,?)";
  db.query(sqlInsert, [firstName, lastName, phoneNumber], (err, result) => {
    res.send(result);
  });
});

app.delete("/deleteContact/:_id", (req, res) => {
  const { _id } = req.params;
  const sqlDelete = "DELETE FROM contactapi.api WHERE _id=?";
  db.query(sqlDelete, _id, (err, result) => {
    res.send(result);
  });
});

app.get("/getSingleContact/:_id", (req, res) => {
  const { _id } = req.params
  const sqlgetSingleContact = "SELECT * FROM contactapi.api WHERE _id=?";
  db.query(sqlgetSingleContact, _id, (err, result) => {
    res.send(result);
  });
});

app.patch("/updateContact/:_id", (req, res) => {
  const { _id } = req.params;
  const {firstName,lastName,phoneNumber} = req.body;
  const sqlupdateContact = "UPDATE contactapi.api SET firstName=? , lastName=?,phoneNumber=? WHERE _id=?";
  db.query(sqlupdateContact, [firstName,lastName,phoneNumber,_id], (err, result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`The server is live on ${port}`);
});

// const sqlInsert = "INSERT INTO api(firstName,lastName,phoneNumber) VALUES ('john','doe',1234567890)"
// db.query(sqlInsert , (e,result)=>{
// console.log("error" , e);
// console.log("Result" , result);
// rs.send("Hello World!  ")
// })
