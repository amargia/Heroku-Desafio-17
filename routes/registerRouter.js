const { Router } = require("express");
const registerRouter = Router();
const registerContainer = require("../controller/registerController.js");

const logger = require('../logs/logger')

registerRouter.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta /register ${method} ${time}`);
    res.render("register");
});

registerRouter.post("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta register ${method} ${time}`)
    const { username, password, email } = req.body
    registerContainer.save({ username, password, email })
        .then((user) => {
            if (user) {
                res.render('success');
            } else {
                res.render('error', { error: "Usuario ya existe", url: "/register" });
            }
        })
});

module.exports = registerRouter;