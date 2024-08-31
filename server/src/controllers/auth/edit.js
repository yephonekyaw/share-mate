const db = require("../../db/connect");

const edit = async (req, res) => {
  try {
    const { username, email } = req.body;
    const id = req.id;
    db.query(
      "UPDATE `users` SET `username` = ?, `email` = ? WHERE `id` = ?",
      [username, email, id],
      (error, data) => {
        if (error) {
          return res.status(500).send("Internal Server Error");
        } else {
          return res.status(200).json({
            state: "success",
            data: null,
            message: "Edit successful",
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = edit;
