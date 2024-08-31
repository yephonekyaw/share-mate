const express = require("express");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const db = require("./db/connect");
const apiRouter = require("./routes/api/allApi");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const feedRouter = require("./routes/feed");
const { verifyAccessToken } = require("./middleware/jwtHandler");
const multer = require("multer");

// initialization
const app = express();
const PORT = process.env.PORT_NO;

// custome middleware logger
app.use(logger);

// middleware for cookies
app.use(cookieParser());

// cross origin resource sharing middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// database connection
db.connect((err) => {
  if (err) console.log(err);
  else console.log("Database is connected");
});

// all routes
app.use("/api/api", apiRouter);
app.use("/api/auth", authRouter);
app.get("/api/test", (req, res) => {
  const path = require("path");
  console.log(path.dirname);
  return res.send("Hello");
});
app.use(verifyAccessToken);
app.use("/api/feed", feedRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
