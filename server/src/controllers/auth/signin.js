const db = require("../../db/connect");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../middleware/jwtHandler");

const signin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const data = await db
      .promise()
      .query("SELECT id, username, password FROM `users` WHERE username = ?", [
        username,
      ]);
    if (data[0].length === 0) {
      return res.status(401).send("Account not found");
    } else if (bcrypt.compareSync(password, data[0][0].password) === false) {
      return res.status(401).send("Incorrect password");
    } else {
      const id = data[0][0].id;
      const username = data[0][0].username;
      const accessToken = generateAccessToken(id, username);
      res.cookie("accessToken", accessToken, {
        sameSite: "None",
        secure: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.status(200).json({
        state: "success",
        data: accessToken,
        message: "Login successful",
      });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = signin;
