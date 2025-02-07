const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");


const auth_router = require("./routes/auth.js");
const event_router = require("./routes/events.js");
const authMiddleware = require("./middlewares/auth.js")

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();
const http_server = http.createServer(app);

const io = new Server(http_server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on(`joinroom`, (data) => {
    console.log(data)
  })

  socket.on("disconnect", () => {console.log("socket removed")})
})

app.use(express.json());
app.use(cors());

app.use("/auth", auth_router);
app.use("/events", authMiddleware, event_router);



mongoose.connect(process.env.DB_URL).then(() => {
  console.log("db connected");
  http_server.listen(PORT, () => {
      console.log("server started, http://localhost:4000/auth/signup")
  })
}).catch((err) => console.log(err));