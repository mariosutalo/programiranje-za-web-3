import express from "express";
import mysql from "mysql2/promise";

let dbConnection = null;
try {
  dbConnection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "shop",
  });
} catch (error) {
  console.log("error connecting to db", error);
  process.exit();
}

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const productsPerPage = 10
  const selectProductsQuery = `
    select id, name, price, stock
    from product
    limit 10 offset 0;`;
  const countProductsQuery = `
    select count(*) as productsCount
    from product;`;

  try {
    const [productsResults] = await dbConnection.query(selectProductsQuery);
    const [countResults] = await dbConnection.query(countProductsQuery);
    const productsCount = countResults[0].productsCount
    const pagesCount = Math.ceil(productsCount/productsPerPage)
    const currentPage = req.query.page

    res.render("index", { products: productsResults, title: "Home Page" });
  } catch (error) {
    console.log("error executing query", error);
    res.render("server-error", { title: "Server Error :(" });
  }
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
