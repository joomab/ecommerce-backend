var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/about-me", function (req, res, next) {
  res.send({
    name: "José Abzum",
    age: 28,
  });
});

module.exports = router;
