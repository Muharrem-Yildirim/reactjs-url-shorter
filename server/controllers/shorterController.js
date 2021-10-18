const ShortenedUrlModel = require("../models/ShortenedUrlModel"),
  validator = require("validator"),
  { uuid } = require("uuidv4"),
  { generateShortUri } = require("../utils");

const insert = (req, res, next) => {
  const originalUrl = req.body?.url || "",
    shortUrl = generateShortUri(req);

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

  model
    .save()
    .then(() => {
      res.send({
        originalUrl: originalUrl,
        shortUrl: shortUrl.fullUrl,
      });
    })
    .catch(() => {
      res.status(500).send({
        error: true,
        message: "Unknown error occured.",
      });
    });
};

const get = (req, res, next) => {
  ShortenedUrlModel.find({ key: req.params?.url }).then((rows) => {
    if (rows.length === 0) {
      res.redirect("/");
      return;
    }

    const { originalUrl } = rows[0];

    res.redirect(originalUrl);
  });
};

module.exports = { get, insert };
