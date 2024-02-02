const express = require("express");
const route = require("../controller/controller");
var router = express.Router();

router.get("/", route.get);
router.post("/", route.post);
router.get("/:id", route.getid);
router.patch("/:id", route.update);
router.delete("/:id", route.delete);

module.exports = router;
