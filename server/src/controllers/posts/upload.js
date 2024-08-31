const db = require("../../db/connect");
const path = require("path");
const fileUpload = require("express-fileupload");

const upload = async (req, res) => {
  try {
    const files = req.files;
    const data = req.body;
    // console.log(files[0].path, data.title);
    const title = data.title;
    const geolocation = data.geolocation || "sample";
    const rent = data.rentPrice;
    const available_from = data.moveInDate;
    const duration = data.duration;
    const type = data.roomType;
    const deposit = data.deposit;
    const description = data.aboutRoom;
    const neighbour = data.aboutNeighbourhood;
    const amenities = data.amenities;
    const on_property = data.facilities;
    const safety = data.safety;
    const count = data.roommates;
    const owner_id = req.id;
    const image_a = files[0].path;
    const image_b = files[1].path;
    const image_c = files[2].path;
    const image_d = files[3].path;
    const image_e = files[4].path;

    const d = [
      [
        title,
        geolocation,
        rent,
        available_from,
        duration,
        type,
        deposit,
        description,
        neighbour,
        amenities,
        on_property,
        safety,
        count,
        owner_id,
        image_a,
        image_b,
        image_c,
        image_d,
        image_e,
      ],
    ];
    await db
      .promise()
      .query(
        "INSERT INTO `posts` (`title`, `geolocation`, `rent`, `available_from`, `duration`, `type`, `deposit`, `description`, `neighbour`, `amenities`, `on_property`, `safety`, `count`, `owner_id`, `image_a`, `image_b`, `image_c`, `image_d`, `image_e`) VALUES ?",
        [d]
      );

    return res.status(200).json({
      state: "success",
      data: null,
      message: "Listing successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = upload;
