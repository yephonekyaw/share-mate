const express = require("express");
const signup = require("../controllers/auth/signup");
const signin = require("../controllers/auth/signin");
const edit = require("../controllers/auth/edit");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/edit", edit);

module.exports = authRouter;
