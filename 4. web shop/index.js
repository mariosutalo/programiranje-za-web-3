import express from "express";
import mysql from "mysql2/promise";
import { router as indexRouter } from "./routes/indexRoute.js";
import { router as productRouter } from "./routes/productRoute.js";
import { router as blogRouter } from "./routes/blogRoute.js";
import { router as aboutRouter } from "./routes/aboutRoute.js";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

// kada je dodana riječ export varijabla se može uvesti u druge .js datoteke
export let dbConnection = null;
try {
  dbConnection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "shop",
  });
} catch (error) {
  console.log("error connecting to db", error);
  process.exit();
}

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));

// middleware se koristi da se kod u njemu izvrši pri posjeti
// bilo koje rute, npr. localhost:3000/products
app.use((req, res, next) => {
  res.app.locals.pageStyles = [];
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  let sessionId = req.cookies.sessionId;
  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie("sessionId", sessionId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
  }
  next();
});

app.listen(3000, (error) => {
  if (error) {
    console.log("server cant be started", error);
    return;
  }
  console.log("server started");
});

app.use("/", indexRouter);
// oba url-a ce ući u productRouter in pokrenuti odgovarajuci endpoint
// localhost:3000/product
// localhost:3000/product/details
app.use("/product", productRouter);
app.use("/blog", blogRouter);
app.use("/about", aboutRouter);
