const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/jwt");
const { getMyPorto, getPortoById, postPorto, putPorto, deletePorto, getPortByIdForRecruit } = require("../controller/portfolioController");
const upload = require("../middleware/multer");

router.post("/portfolio", protect, upload.single("photo"), postPorto);
router.get("/portfolio", protect, getMyPorto);
router.put("/portfolio/:id", protect, upload.single("photo"), putPorto);
router.get("/portfolio/:id", getPortoById);
router.get("/portfolio(recruiter)/:id", getPortByIdForRecruit);
router.delete("/portfolio/:id", protect, deletePorto);

module.exports = router;
