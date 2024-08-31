const db = require("../../db/connect");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const captcha = req.body.captcha;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SITE_SECRET}&response=${captcha}`,
    {
      method: "POST",
      body: JSON.stringify({ captcha }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!data.success) {
    return res.status(401).send("Google detects a robot");
  }

  try {
    const SALT = parseInt(process.env.SALT);
    const username = req.body.username;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, SALT);
    const credit_ID = uuidv4();
    const data = [
      [username, email, password, new Date(), new Date(), credit_ID],
    ];
    await db
      .promise()
      .query(
        "INSERT INTO `users` (`username`, `email`, `password`, `created_at`, `updated_at`, `credit_ID`) VALUES ?",
        [data]
      );

    return res.status(200).json({
      state: "success",
      data: null,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = signup;
