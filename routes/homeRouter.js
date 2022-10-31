const { Router } = require("express");
const home = Router();
const auth = require("../middlewares/auth.js");
const User = require("../models/User.js");
const Contenedor = require("../controller/productsController")

const logger = require("../logs/logger");

home.get("/", auth, async (req, res) => {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta home con metodo: ${method} - time: ${time}`)

  const userData = await User.findById(req.user._id);
  const productos = await Contenedor.getAll()
  const user = userData.username;
  res.render("home", { user: user, productos: productos });
});

module.exports = home;