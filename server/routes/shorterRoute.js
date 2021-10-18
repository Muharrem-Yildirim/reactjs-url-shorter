const router = require("express").Router(),
  rateLimit = require("express-rate-limit"),
  { insert, get } = require("../controllers/shorterController");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5,
  message: "Too many requests.",
});

router.use(apiLimiter).post("/short", insert).get("/:url", get);

module.exports = router;
