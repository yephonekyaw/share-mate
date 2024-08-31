const db = require("../../db/connect");
const details = async (req, res) => {
  try {
    const id = req.query.id;
    db.query("SELECT * FROM posts WHERE id = ?", [id], (error, data) => {
      if (error) {
        return res.status(500).send(error.message);
      } else {
        return res.json({
          state: "success",
          data: data,
          message: "Fetching successful",
        });
      }
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = details;
