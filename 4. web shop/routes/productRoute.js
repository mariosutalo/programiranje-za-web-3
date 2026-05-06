import express from "express";
// ./ - trenutna mapa, ../ - mapa iznad
import { dbConnection } from "../index.js";
import { appConstants } from "../config/appConstants.js";
import * as z from "zod";

export const router = express.Router();

const productIdSchema = z.number().int().positive();

router.get("/", (req, res) => {
  res.render("products");
});

router.get("/details", async (req, res) => {
  const productId = req.query.id;
  const productIdAsNumber = Number(productId);
  const productIdResult = productIdSchema.safeParse(productIdAsNumber);
  if (productIdResult.error) {
    res.render("server-error");
    return;
  }
  const productDetailsQuery = `
  select *
  from product
  where id=${productIdAsNumber};
  `;
  const [productDetailsResult] = await dbConnection.query(productDetailsQuery);

  res.render("product-details", {
    title: "Product Details",
    productDetails: productDetailsResult[0],
  });
});
