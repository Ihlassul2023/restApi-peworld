const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwt");
const { postWE, getMyWE, getWEById, putWE, deleteWE, getWEByIdForRecruit } = require("../controller/experienceController");

router.post("/experience", protect, postWE);
router.get("/experience", protect, getMyWE);
router.put("/experience/:id", protect, putWE);
router.get("/experience/:id", getWEById);
router.get("/experience-hiring/:id", getWEByIdForRecruit);
router.delete("/experience/:id", protect, deleteWE);

module.exports = router;
