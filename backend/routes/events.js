const {
  createRoom,
  joinRoom,
  exitRoom,
  getRooms,
  deleteRoom,
  getEvent,
  getRoomsAdmin,
} = require("../controllers/events.js");
const event_router = require("express").Router();
const multer = require("multer");
const storage = require("../utils/cloud.js");
const upload = multer({storage})

const authMiddleware = require("../middlewares/auth.js")


event_router.post("/create", authMiddleware, upload.single("banner"), createRoom);
event_router.post("/join/:eventId", authMiddleware, joinRoom);
event_router.patch("/exit/:eventId", authMiddleware, exitRoom);
event_router.delete("/:eventId", authMiddleware, deleteRoom);

event_router.get("/", getRooms);
event_router.get("/get/:eventId", authMiddleware, getEvent);
event_router.get("/admin", authMiddleware, getRoomsAdmin);

module.exports = event_router;