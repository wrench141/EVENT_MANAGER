const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (email) {
        return (
          email === null ||
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        );
      },
      message: "Please enter a valid email address",
    },
  },
  password:{
    type: String,
    required: true
  },
  
});

userSchema.pre("save", async function(next){
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 11);
    next();
})


const User = mongoose.model("Users", userSchema);
module.exports = User;