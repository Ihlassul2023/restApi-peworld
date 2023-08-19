<<<<<<< HEAD
const { registerWorker, getProfileWorker, getWorker, loginWorker, editWorker, getById, deleteAccount } = require("../controller/workerController");

=======
const { registerWorker, getWorker, loginWorker, editWorker, getById, getProfileWorker, deleteAccount } = require("../controller/workerController");
>>>>>>> menu/profile
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

module.exports = router;
