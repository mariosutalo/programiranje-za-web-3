import express from "express";
import mysql from "mysql2";

const dbConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "shop",
});

dbConnection.connect((error) => {
  if (error) {
    console.log("error connecting to db:", error);
    return;
  }
});

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  dbConnection.query(
    `select id, name, price, stock
    from product
    limit 10 offset 0;`,
    (error, results, fields) => {
      if (error) {
        console.log("error executing query", error);
        res.render("server-error", {title: 'Server Error :('});
        return;
      }
      console.log("simple select data", results);
      res.render("index", { products: results, title: "Home Page" });
    },
  );
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, (error) => {
  if (error) {
    console.log("server cant be started", error);
    return;
  }
  console.log("server started");
});
