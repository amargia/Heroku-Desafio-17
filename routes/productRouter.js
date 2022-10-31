const express = require("express");
const { Router } = require("express");
const products = Router();

const logger = require('../logs/logger')

const Contenedor = require("../controller/productsController")

products.get("/", (req, res) => {
  try {
    const { method } = req;
    const time = new Date().toLocaleString();
    Contenedor.getAll()
    .then((productos) => {
      logger.info(`Ruta /productos [${time}] ${method}`);
      res.render('products', {productos});
    })
  } catch (error) {
    logger.error(`Ruta /productos [${time}] ${method} ${error}`)
    res.status(500).send("Error al obtener los productos");
  }

});

products.post("/", (req, res) => {
  const { method } = req;
  const time = new Date().toLocaleString();
  const {title, price, thumbnail} = req.body
  try {
    Contenedor.create(title, price, thumbnail)  
    const productos = Contenedor.getAll();
    res.redirect('/');
    logger.info(`Ruta /productos [${time}] ${method}`);
  } catch (error) {
    logger.error(`Ruta /productos [${time}] ${method} ${error}`)
  }
});

module.exports = products;