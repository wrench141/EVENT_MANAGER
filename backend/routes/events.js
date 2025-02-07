const { createRoom, joinRoom, exitRoom, getRooms, deleteRoom, getEvent } = require("../controllers/events.js");
const event_router = require("express").Router();
const multer = require("multer");
const storage = require("../utils/cloud.js");
const upload = multer({storage})


event_router.post("/create", upload.single("banner"), createRoom);
event_router.patch("/join/:eventId", joinRoom);
event_router.patch("/exit/:eventId", exitRoom);
event_router.get("/", getRooms);
event_router.delete("/:eventId", deleteRoom);
event_router.get("/get/:eventId", getEvent);

module.exports = event_router;