const router = require("express").Router(),
  rateLimit = require("express-rate-limit"),
  { insert, get } = require("../controllers/shorterController");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5,
  message: "Too many requests.",
});

router.set("trust proxy", 1); // without this rate-limiter won't work

router.post("/short", apiLimiter, insert).get("/:url", get);

module.exports = router;
