const randomstring = require("randomstring"),
  querystring = require("querystring");

async function generateShortUrl(req) {
  const key = randomstring.generate(7);

  if (await require("./controllers/shorterController").isKeyUsing(key)) {
    return generateShortUrl(req);
  } else {
    return {
      fullUrl: req.protocol + "://" + req.get("host") + "/" + key,
      key: key,
    };
  }
}

function getValidUrl(url = "") {
  let newUrl = querystring.unescape(url);
  newUrl = newUrl.trim().replace(/\s/g, "");

  if (/^(:\/\/)/.test(newUrl)) {
    return `http${newUrl}`;
  }
  if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
    return `http://${newUrl}`;
  }

  return newUrl;
}

module.exports = { generateShortUrl, getValidUrl };
