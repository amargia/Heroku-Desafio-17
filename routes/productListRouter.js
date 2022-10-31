const { Router } = require("express");
const productsList = Router();

const logger = require('../logs/logger');

const Contenedor = require("../controller/productsController")

productsList.get("/", (req, res) => {
  try {
    Contenedor.getAll()
    .then((data) => {
      res.status(200).send(data); 
    })
  } catch (error) {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.error(`Ruta /productos [${time}] ${method} ${error}`);
    res.status(500).send("Error al obtener los productos");
  }
});


module.exports = productsList;