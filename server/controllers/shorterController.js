const urlModel = require("../models/urlModel"),
  validator = require("validator"),
  { generateShortUri } = require("../utils");

const insert = async (req, res, next) => {
  const originalUrl = req.body?.url || "",
    shortUrl = await generateShortUri(req);

  if (!validator.isURL(originalUrl)) {
    res.status(400).send({
      error: true,
      message: "URL is not valid.",
    });
    return;
  }

  let model = new urlModel({
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
  urlModel.find({ key: req.params?.url }).then((rows) => {
    if (rows.length === 0) {
      res.redirect("/");
      return;
    }

    const { originalUrl } = rows[0];

    res.redirect(originalUrl);
  });
};

const isKeyUsing = (key) => {
  return new Promise((resolve, reject) => {
    urlModel.count({ key: key }).then((count, err) => {
      if (err) reject(err);

      resolve(count > 0);
    });
  });
};

module.exports = { get, insert, isKeyUsing };
