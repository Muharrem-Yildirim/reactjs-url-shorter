const bodyParser = require("body-parser"),
  path = require("path"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  shorterRoute = require("./routes/shorterRoute"),
  express = require("express");

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/url-shorter"
  );
}

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .set("json spaces", 2)
  .set("trust proxy", 1) // without this rate-limiter won't work
  .use(shorterRoute)
  .use((err, req, res, next) => res.status(500).send("Internal server error."))
  .use(express.static(path.join("build")))
  .listen(process.env.PORT || 1337, () => main());

process.on("uncaughtException", (error) => {
  console.log(error);
});
