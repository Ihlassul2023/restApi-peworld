const { getSkillById, postData } = require("../controller/skillController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwt");

router.get("/skill", protect, getSkillById);
router.post("/skill", protect, postData);

module.exports = router;
