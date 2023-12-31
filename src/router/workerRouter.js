const { registerWorker, getWorker, loginWorker, editWorker, getById, getProfileWorker, deleteAccount, verify } = require("../controller/workerController");

const app = require("express");
const router = app.Router();
const upload = require("../middleware/multer");
const { protect } = require("../middleware/jwt");

router.get("/list-worker", protect, getWorker);
router.get("/profileWorker", protect, getProfileWorker);
router.get("/list-worker/:id", getById);
router.post("/register-worker", upload.single("photo"), registerWorker);
router.post("/login-worker", loginWorker);
router.put("/update-worker", protect, upload.single("photo"), editWorker);
router.delete("/delete-worker", protect, deleteAccount);
router.get("/verify-worker/:id", verify);

module.exports = router;
