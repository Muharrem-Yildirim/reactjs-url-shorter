const bodyParser = require("body-parser"),
  validator = require("validator"),
  path = require("path"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  rateLimit = require("express-rate-limit"),
  { uuid } = require("uuidv4"),
  express = require("express");
const ShortenedUrlModel = require("./model/ShortenedUrlModel");

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/url-shorter"
  );
}

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5,
  message: "Too many requests.",
});

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .set("json spaces", 2)

  .post("/short", apiLimiter, (req, res, next) => {
    const originalUrl = req.body?.url || "",
      shortUrl = generateShortUri(req);

    // console.log(req.body);

    if (!validator.isURL(originalUrl)) {
      res.status(400).send({
        error: true,
        message: "URL is not valid.",
      });
      return;
    }

    let model = new ShortenedUrlModel({
      originalUrl: originalUrl,
      key: shortUrl.key,
    });

    model.save();

    res.send({
      originalUrl: originalUrl,
      shortUrl: shortUrl.fullUrl,
    });
  })
  .get("/:url", (req, res, next) => {
    ShortenedUrlModel.find({ key: req.params?.url }).then((rows) => {
      if (rows.length === 0) {
        res.redirect("/");
        return;
      }

      const { originalUrl } = rows[0];

      res.redirect(originalUrl);
    });
  })
  .use(express.static(path.join("build")))
  .listen(process.env.PORT || 1337, () => main());

function generateShortUri(req) {
  const rand = uuid().replace("-", "").slice(0, 7);

  return {
    fullUrl: req.protocol + "://" + req.get("host") + "/" + rand,
    key: rand,
  };
}
