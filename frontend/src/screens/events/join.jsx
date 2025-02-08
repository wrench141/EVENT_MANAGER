import axios from "axios";
import {useParams} from "react-router"
import "./style.css"
import { SERVER_API } from "../../keys.js"; 
import { useEffect, useState } from "react";

import socketIo from "socket.io-client"
const socket = socketIo.connect("https://event-manager-73so.onrender.com")

export default function EventSpace(){
    
    const id = (useParams())?.id;
    console.log(id);

    const [data, setData] = useState({});
    const [msg, setMsg] = useState("");
    const [incMsgs, setMsgs] = useState([])
    
    const joinEvent = async() => {
        const token = window.localStorage.getItem("token");
        const resp = await axios.post(SERVER_API + `/events/join/${id}`, {}, {
            headers: {
                token: token,
            }
        }).catch((e) => e.response);
        if(resp.status == 200){
            socket.emit("joinroom", id)
        }
    }

    const fetchEvent = async() => {
        const token = window.localStorage.getItem("token")
        const response = await axios.get(SERVER_API + `/events/get/${id}`, {
            headers: {
                token: token
            }
        }).catch((err) => err.response);
        console.log(response.data);
        setData(response.data);
        
    }


    useEffect(() => {
      const token = window.localStorage.getItem("token");
        if(!token){navigate("/signin")};
        fetchEvent();
        if(data){
            joinEvent();
        }
        socket.on("msg", (msg) => {
            console.log(incMsgs);
            setMsgs(prev => [...prev, msg]);
        })
    }, []);


    return (
      <div className="evnt">
        <div className="section">
          <p className="title">{data?.name}</p>
          <p className="desc">{data?.description}</p>
          <div
            style={{ backgroundImage: `url(${data?.banner})` }}
            alt=""
            className="banner"
          />
          <div className="seats">
            <p className="stitle">
              Available Seats ✦{" "}
              {
                data?.bookedSlots != undefined ? parseInt(data?.maxSlotSize) - data?.bookedSlots.length + "/" + data?.maxSlotSize : null
              }
            </p>
            <div className="seatsWrap">
              {data && data?.bookedSlots != undefined
                ? new Array(parseInt(data?.bookedSlots.length))
                    .fill(0)
                    .map((e, i) => <div className="seat booked">✦</div>)
                : null}
              {data?.maxSlotSize != null
                ? new Array(
                    parseInt(data?.maxSlotSize) - data?.bookedSlots.length
                  )
                    .fill(0)
                    ?.map((e, i) => <div className="seat"></div>)
                : null}
            </div>
          </div>
          <button
            className="btn"
            style={{
              marginTop: "20px",
              background: "#ff000015",
              border: "1px solid #ff00002d",
              color: "#ff0000e5",
            }}
          >
            Unsubscribe
          </button>
        </div>
        <div className="details">
          <div className="strip">
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
            <p> ✴ Event Updates ✴ </p>
          </div>
          <div className="logs">
            {incMsgs?.map((msg) => (
              <div className="msg">
                <p className="adName">
                  {msg.name} <span>✦</span>
                </p>
                <p className="time">{msg.time}</p>
                <p className="txtmsg">{msg.msg}</p>
              </div>
            ))}
            <div className="inputWrap">
              <input
                type="text"
                placeholder="Provide an Update"
                className="inp"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                className="btn"
                onClick={() => {
                  socket.emit("privateRoom", {
                    roomId: id,
                    msg: msg,
                  });
                  setMsg("");
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}