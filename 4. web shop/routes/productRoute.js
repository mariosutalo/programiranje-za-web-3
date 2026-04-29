import express from "express";
// ./ - trenutna mapa, ../ - mapa iznad
import { dbConnection } from "../index.js";
import { appConstants } from "../config/appConstants.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("products");
});

router.get("/details", (req, res) => {
  const productId = req.query.id;
  const productIdAsNumber = Number(productId);
  if (Number.isInteger(productIdAsNumber) === false || productIdAsNumber < 1) {
    res.render("server-error");
    return
  }
  res.render("product-details", { title: "Product Details" });
});
