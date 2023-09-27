const { getParticipantUser1, getParticipantUser2, postMessage, getMessageUser1, getMessageUser2 } = require("../controller/chatController");
const app = require("express");
const router = app.Router();
const { protect } = require("../middleware/jwt");

router.post("/postMessage", protect, postMessage);
router.get("/participantUser1", protect, getParticipantUser1);
router.get("/participantUser2", protect, getParticipantUser2);
router.get("/messageUser1/:id", protect, getMessageUser1);
router.get("/messageUser2/:id", protect, getMessageUser2);
module.exports = router;
