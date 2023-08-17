const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authentication");
const { postWE, getMyWE, getWEById, putWE, deleteWE } = require("../controllers/experienceController");

router.post("/createExperience", authenticateUser, postWE);
router.get("/showMyExperience", authenticateUser, getMyWE);
router.put("/updateExperience/:id", authenticateUser, putWE);
router.get("/getExperience/:id", getWEById);
router.delete("/deleteExperience", authenticateUser, deleteWE);

module.exports = router;
