const randomstring = require("randomstring");

async function generateShortUri(req) {
  const key = randomstring.generate(7);

  if (await require("./controllers/shorterController").isKeyUsing(key)) {
    return generateShortUri(req);
  } else {
    return {
      fullUrl: req.protocol + "://" + req.get("host") + "/" + key,
      key: key,
    };
  }
}

module.exports = { generateShortUri };
