const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const eventSchema = mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  description: { type: String, required: true },
  bookedSlots: [{type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
  maxSlotSize: {type: Number, required: true},
  roomType: {type: String, enum: ["private", "public"], default: "public"},
  passcode: {type: String},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  banner: {type: String, required: true},
});

eventSchema.pre("save", async function(next){
    const event = this;
    if(!event.isModified("passcode")) return next();
    event.passcode = await bcrypt.hash(event.passcode, 11);
    next();
})

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
