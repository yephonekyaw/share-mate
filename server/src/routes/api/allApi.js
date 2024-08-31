const express = require("express");
const apiToValidate = require("../../controllers/api/apiToValidate");

const apiRouter = express.Router();

apiRouter.get("/users", apiToValidate);

module.exports = apiRouter;
