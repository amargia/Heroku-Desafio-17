const { Router } = require("express");
const passport = require("../middlewares/passport.js");
const loginRouter = Router();

const logger = require('../logs/logger')

loginRouter.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta /login [${time}] ${method}`);
    res.render("login");
});

loginRouter.post("/", passport.authenticate("local", {failureRedirect: "/loginError"}),
    (req, res) => {
        const { method } = req;
        const time = new Date().toLocaleString();
        logger.info(`Ruta /login [${time}] ${method}`);
        res.redirect("/");
    }
);

// loginRouter.get("/privada" , authorize , (req, res) => {
//     res.render("Ruta privada");
// });

module.exports = loginRouter;