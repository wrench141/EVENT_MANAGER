const {signin, signup} = require("../controllers/auth.js");
const auth_router = require("express").Router();


auth_router.post("/signin", signin);
auth_router.post("/signup", signup);

module.exports = auth_router;