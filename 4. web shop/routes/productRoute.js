import express from "express";
// ./ - trenutna mapa, ../ - mapa iznad
import { dbConnection } from "../index.js";
import { appConstants } from "../config/appConstants.js";
import * as z from "zod";

export const router = express.Router();

const productIdSchema = z.number().int().positive();

//localhost:3000/product
router.get("/", (req, res) => {
  res.render("products");
});

//localhost:3000/product/details
router.get("/details", async (req, res) => {
  const productId = req.query.id;
  const productIdAsNumber = Number(productId);
  const productIdResult = productIdSchema.safeParse(productIdAsNumber);
  if (productIdResult.error) {
    res.render("server-error");
    return;
  }
  const productDetailsQuery = `
  select id, name, price, stock, description, image_path as imagePath
  from product
  where id=${productIdAsNumber};
  `;
  const [productDetailsResult] = await dbConnection.query(productDetailsQuery);

  res.render("product-details", {
    title: "Product Details",
    productDetails: productDetailsResult[0],
  });
});

router.post("/add-to-cart", async (req, res) => {
  const productId = Number(req.body.id);
  const quantity = Number(req.body.quantity);
  const checkIfSessionExistsQuery = `SELECT count(*) as count FROM shop.session
                                    where uuid = ?`;
  const sessionIdFromCookie = req.cookies.sessionId;
  const [checkCookieResult] = await dbConnection.execute(
    checkIfSessionExistsQuery,
    [sessionIdFromCookie],
  );
  if (checkCookieResult[0].count === 0) {
    const insertUuidInSessionQuery = `insert into session(uuid)
                                      values (?)`;
    await dbConnection.execute(insertUuidInSessionQuery, [sessionIdFromCookie]);
  }
  const addToCartQuery = `insert into cart_item (product_id, quantity, session_uuid) 
                            values (?, ?, ?)`;
  await dbConnection.execute(addToCartQuery, [
    productId,
    quantity,
    sessionIdFromCookie,
  ]);
  res.redirect(`/product/details?id=${productId}`);
});
