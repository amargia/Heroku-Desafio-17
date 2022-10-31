const express = require("express");
const { Router } = require("express");
const nginxRandom = Router();

const numCpus = require("os").cpus().length;

const logger = require('../logs/logger')

const Port = parseInt(process.argv[2]) || 8080;

const random = () => {
    return Math.floor(Math.random() * 1000) + 1;
}

nginxRandom.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta /random [${time}] ${method}`);
    console.log(`Request received on ${Port} Date: ${new Date()}`);
    const randomNum = random();
    const info = {
        num_random: randomNum,
        num_cpus: numCpus,
    }
    res.send(info);
})

module.exports = nginxRandom;