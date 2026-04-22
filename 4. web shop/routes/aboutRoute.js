import express from "express";
// ./ - trenutna mapa, ../ - mapa iznad
import { dbConnection } from "../index.js";
import { appConstants } from "../config/appConstants.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("about");
});
