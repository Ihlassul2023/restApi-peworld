<<<<<<< HEAD
const { registerWorker, getWorker, loginWorker, editWorker, getById, getProfileWorker } = require("../controller/workerController");
=======
const { registerWorker, getWorker, loginWorker, editWorker, getById, deleteAccount } = require("../controller/workerController");
>>>>>>> f61109645461616314a131d3f0367617c3f193c8
const app = require("express");
const router = app.Router();
const upload = require("../middleware/multer");
const { protect } = require("../middleware/jwt");

router.get("/list-worker", protect, getWorker);
router.get("/profilWorker", protect, getProfileWorker);
router.get("/list-worker/:id", getById);
router.post("/register-worker", upload.single("photo"), registerWorker);
router.post("/login-worker", loginWorker);
router.put("/update-worker", protect, upload.single("photo"), editWorker);
router.delete("/delete-worker", protect, deleteAccount)

module.exports = router;
