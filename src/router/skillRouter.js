const { getSkillById, postData, getSkillByIdForRecruit, putData, deleteDataById, getData, searchSort } = require("../controller/skillController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwt");

router.get("/skill", protect, getData);
router.get("/skillid", protect, getSkillById);
router.get("/skill-hiring/:id", getSkillByIdForRecruit);
router.post("/skill", protect, postData);
router.put("/skill", protect, putData);
router.delete("/skill", protect, deleteDataById);
router.get("/search", protect, searchSort);

module.exports = router;
