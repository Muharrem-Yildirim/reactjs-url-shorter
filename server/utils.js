const { uuid } = require("uuidv4");

function generateShortUri(req) {
  const rand = uuid().replace("-", "").slice(0, 7);

  return {
    fullUrl: req.protocol + "://" + req.get("host") + "/" + rand,
    key: rand,
  };
}

module.exports = { generateShortUri };
