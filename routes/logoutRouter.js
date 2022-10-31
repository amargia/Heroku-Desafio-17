const { Router } = require("express");
const logoutRouter = Router();
const User = require("../models/User.js");

const logger = require('../logs/logger')

logoutRouter.get("/", async (req, res) => {
    const userData = await User.findById(req.user._id);
    const user = userData.username;
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send("Error al cerrar sesión");
        } else {
            const { method } = req;
            const time = new Date().toLocaleString();
            logger.info(`Ruta /logout [${time}] ${method}`);
            res.render("logout", { user });
        }
    });
});

module.exports = logoutRouter;