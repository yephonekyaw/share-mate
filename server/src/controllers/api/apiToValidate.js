const db = require("../../db/connect");

const apiToValidate = async (req, res) => {
  try {
    db.query(
      "SELECT username, email FROM `users` ORDER BY CHAR_LENGTH(username) ASC",
      (error, data) => {
        if (error) {
          return res.status(500).send(error.message);
        } else {
          return res.json({
            state: "success",
            data: data,
            message: "Fetching successful",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = apiToValidate;
