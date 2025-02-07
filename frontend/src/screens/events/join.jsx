import axios from "axios";
import {useParams} from "react-router"
import "./style.css"
import { SERVER_API } from "../../keys.js"; 
import { useEffect, useState } from "react";

import socketIo from "socket.io-client"
const socket = socketIo.connect("http://localhost:4000")

export default function EventSpace(){
    
    const id = (useParams())?.id;
    console.log(id);

    const [data, setData] = useState({})

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

    const joinEvent = async() => {
        const token = window.localStorage.getItem("token")
        const response = await axios.paatch(SERVER_API + `/events/join/${id}`, {
            headers: {
                token: token
            }
        }).catch((err) => err.response);
        console.log(response.data);
        setData(response.data);
        if (response.status == 200) {
          socket.emit(`joinroom`, {
            roomId: id,
            token: token,
          });
        }
    }

    useEffect(() => {
        fetchEvent();
    }, []);



    return(
        <div className="evnt">
            <div className="section">
                <p className="title">2nd aniversary</p>
                
            </div>
            <div className="details">

            </div>
        </div>
    )
}