const { getSkillById, postData, getSkillByIdForRecruit } = require("../controller/skillController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwt");

router.get("/skill", protect, getSkillById);
router.get("/skill(recruiter)/:id", getSkillByIdForRecruit);
router.post("/skill", protect, postData);

module.exports = router;
