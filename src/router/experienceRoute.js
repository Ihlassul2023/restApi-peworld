const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwt");
const { postWE, getMyWE, getWEById, putWE, deleteWE } = require("../controllers/experienceController");

router.post("/experience", protect, postWE);
router.get("/experience", protect, getMyWE);
router.put("/experience/:id", protect, putWE);
router.get("/experience/:id", getWEById);
router.delete("/experience", protect, deleteWE);

module.exports = router;
