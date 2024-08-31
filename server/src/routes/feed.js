const express = require("express");
const newfeed = require("../controllers/feed/newfeed");
const details = require("../controllers/feed/details");

const feedRouter = express.Router();

feedRouter.get("/", newfeed);
feedRouter.get("/details", details);

module.exports = feedRouter;
