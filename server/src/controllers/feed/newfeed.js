const db = require("../../db/connect");

const newfeed = async (req, res) => {
  // filtering will be added within query or body
  try {
    db.query("SELECT * FROM posts", (error, data) => {
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

module.exports = newfeed;
