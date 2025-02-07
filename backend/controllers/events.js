const Event = require("../models/event.js");

const createRoom = async(req, res) => {
    try {
        const {
          uid,
          name,
          description,
          maxSlotSize,
          roomType,
          passcode,
          startDate,
          endDate,
        } = req.body;


        console.log(req.body, req.file)

        const dupRoom = await Event.findOne({ uid, name: name.toLowerCase() });
        if (!dupRoom) {
            const newEvent = new Event({
              uid,
              name: name.toLowerCase(),
              description,
              maxSlotSize,
              roomType,
              passcode,
              startDate,
              endDate,
              banner: req?.file.path
            });
            await newEvent.save();
            res.status(200).json({"msg": "Event Created"})
        } else {
          res.status(400).json({ msg: "Event exists" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"});
    }
}


const joinRoom = async(req, res) => {
    try {
        const {eventId} = req.params;
        const {uid} = req.body;
        const event = await Event.findById(eventId);
        if(event){
            if (!event.bookedSlots.includes(uid)){
                event.bookedSlots.push(uid);
            };
            await event.save();
            res.status(200).json({"msg": "joined event"});
        }else{
            res.status(404).json({"msg": "event not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"});
    }
}


const exitRoom = async(req, res) => {
    try {
        const {eventId} = req.params;
        const {uid} = req.body;
        const event = await Event.findById(eventId);
        if(event){
            event.bookedSlots = event.bookedSlots?.filter((userid) => userid != uid);
            await event.save();
            res.status(200).json({"msg": "event booking canceled"});
        }else{
            res.status(404).json({"msg": "event not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"});
    }
}

const getRooms = async(req, res) => {
    try {
        const events = await Event.find();
        if(events?.length > 0){
            res.status(200).json({"events": events});
        }else{
            res.status(404).json({"msg": "no events found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"});
    }
}

const getRoomsAdmin = async(req, res) => {
    try {
        const {uid} = req.body;
        const events = await Event.find({uid});
        if(events?.length > 0){
            res.status(200).json({"events": events});
        }else{
            res.status(404).json({"msg": "no events found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"});
    }
}


const deleteRoom = async(req, res) => {
    try {
        const { eventId } = req.params;
        await Event.findOneAndDelete(eventId);
        res.status(200).json({"msg": "event removed"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"});
    }
};


const getEvent = async(req, res) => {
    try {
        const id = req.params.eventId;
        const event = await Event.findById(id);
        if(event){
            res.status(200).json(event);
        }else{
            res.status(404).json({"msg": "Event Expired"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({"msg": "server error"})
    }
}

module.exports = {
  createRoom,
  joinRoom,
  exitRoom,
  getRooms,
  deleteRoom,
  getEvent,
  getRoomsAdmin,
};