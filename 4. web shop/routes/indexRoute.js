import express from "express";
// ./ - trenutna mapa, ../ - mapa iznad
import { dbConnection } from "../index.js";
import { appConstants } from "../config/appConstants.js";

export const router = express.Router();

// primjer jednog endpointa: router.get("/").....
router.get("/", async (req, res) => {
  // sql query koji se treba izvrsiti u bazi podataka
  // broji koliko je ukupno proizvoda u tablici product
  const countProductsQuery = `
    select count(*) as productsCount
    from product;`;

  // ako dođe do greške try bloku, catch blok će je uhvatiti
  // i onda u catch blocku možemo raditi sa tog greškom što želimo
  try {
    // primjer ručno bačene greške, kod ispod ove greške u try bloku
    // se nece izvršiti, kod se nastavlja izvršavati u catch bloku
    // thrownew Error("some error");
    let currentPage;
    if (isNaN(Number(req.query.page))) {
      currentPage = 1;
    } else {
      currentPage = Number(req.query.page);
    }
    // offset - od kojeg retka u tablici product će se odabrati proizvodi
    
    const offset = (currentPage - 1) * appConstants.productsPerPage;

    // Za prvu stranicu je offset 0, tako da će query izgledati:
    // const selectProductsQuery = `
    // select id, name, price, stock
    // from product
    // limit 6 offset 0;`;
    const selectProductsQuery = `
    select id, name, price, stock
    from product
    limit ${appConstants.productsPerPage} offset ${offset};`;

    // Za prvu stranicu povlači prvih 6 proizvoda
    const [productsResults] = await dbConnection.query(selectProductsQuery);
    // Ovaj kod uvijek broji koliko je ukupno proizvoda u bazi radi
    // radi pravilnog izračuna paginacije
    const [countResults] = await dbConnection.query(countProductsQuery);
    // Product count rezulat iz baze svojstvo u prvom objektu iz countresult polja 
    const productsCount = countResults[0].productsCount;
    // Broj stranica je zaokružen na veći broj ako je decimalni broj rezulat
    // npr. 7.2 će biti broj 8, 8 stranica
    const pagesCount = Math.ceil(productsCount / appConstants.productsPerPage);
    // res render opis:
    // prvi parametar: "index", u mapi views učitava datoteku index.ejs
    // drugi parametar: {
    //   products: productsResults,
    //   title: "Home Page",
    //   currentPage: currentPage,
    //   pagesCount: pagesCount,
    // }
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
});

