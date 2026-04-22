import express from 'express'
// ./ - trenutna mapa, ../ - mapa iznad
import { dbConnection } from '../index.js'
import { appConstants } from '../config/appConstants.js'

export const router = express.Router()

router.get('/', async (req, res) => {
    const countProductsQuery = `
    select count(*) as productsCount
    from product;`;

  try {
    let currentPage;
    if (isNaN(Number(req.query.page))) {
      currentPage = 1;
    } else {
      currentPage = Number(req.query.page);
    }
    const offset = (currentPage - 1) * appConstants.productsPerPage;

    const selectProductsQuery = `
    select id, name, price, stock
    from product
    limit ${appConstants.productsPerPage} offset ${offset};`;

    const [productsResults] = await dbConnection.query(selectProductsQuery);
    const [countResults] = await dbConnection.query(countProductsQuery);
    const productsCount = countResults[0].productsCount;
    const pagesCount = Math.ceil(productsCount / appConstants.productsPerPage);
    res.render("index", {
      products: productsResults,
      title: "Home Page",
      currentPage: currentPage,
      pagesCount: pagesCount,
    });
  } catch (error) {
    console.log("error executing query", error);
    res.render("server-error", { title: "Server Error :(" });
  }
})

