import { useState } from "react";
import * as request from "../../requests/request";
import "./style.css";
import {useNavigate} from "react-router"
import { useEffect } from "react";

export default function CreateEvent(){

    const navigate = useNavigate();

    const [load, setLoad] = useState(false);
    const [resp, setResp] = useState("Create Event"); 
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [maxSlotSize, setSlot] = useState("");
    const [roomType, setType] = useState("public");
    const [passcode, setPass] = useState("");
    const [startDate, setStart] = useState("");
    const [endDate, setEnd] = useState("");
    const [banner, setBanner] = useState("");

    const options = ["public", "private"];

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setBanner(file);
      }
    };

    const createEvent = async () => {
      setLoad(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("maxSlotSize", maxSlotSize);
        formData.append("roomType", roomType);
        formData.append("passcode", passcode);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        if (banner) {
          formData.append("banner", banner);
        }

        const response = await request.postRequest("/events/create", formData);
        setResp(response.msg);
        console.log(response);
      } catch (error) {
        setResp("Error Creating Event");
        console.error(error);
      } finally {
        setLoad(false);
        navigate("/createEvent")
      }
    };


    const [events, setEvents] = useState([]);
    const fetchEvents = async() => {
        const response = await request.getRequest("/events/admin");
        setEvents(response?.events)
        console.log(response?.events)
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if(!token){navigate("/signin")};
        fetchEvents()
    }, [])


    return (
      <div className="eventContainer">
        <div className="section">
          <p className="title">
            <span>✦</span> Your Events <span>✦</span>
          </p>
          <div className="cards">
            {events?.map((event, i) => (
              <div className="card" key={i}>
                <div
                  style={{ backgroundImage: `url(${event.banner})` }}
                  alt=""
                  className="banner"
                />
                <p className="ename">{event.name}</p>
                <p className="esub">{event.description.slice(0, 70) + "..."}</p>
                <a href={`/event/${event._id}`} className="btn" style={{marginTop: 20}}>
                    Join Event
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="form">
          <p className="maintitle">Create an Event</p>
          <p className="subtitle">Fill all the data.</p>
          <div className="wrapper">
            <label className="lab">Event Banner</label>
            <input
              type="file"
              className="inp"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="wrapper">
            <label className="lab">Event Name</label>
            <input
              type="text"
              className="inp"
              placeholder="Enter your Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <label className="lab">Description</label>
            <textarea
              type="text"
              className="inp"
              placeholder="Enter Event Description"
              style={{ paddingTop: "10px", height: "100px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <label className="lab">No of Seats</label>
            <input
              type="text"
              className="inp"
              placeholder="Enter Max no. of seats"
              value={maxSlotSize}
              onChange={(e) => setSlot(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <label className="lab">Room Type</label>
            <select
              className="inp"
              value={roomType}
              onChange={(e) => setType(e.target.value)}
            >
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="wrapper">
            <label className="lab">Passcode (optional)</label>
            <input
              type="text"
              className="inp"
              placeholder="Enter passcode if private room"
              value={passcode}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <label className="lab">Start Date</label>
            <input
              type="date"
              className="inp"
              placeholder="Enter Start date"
              value={startDate}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <label className="lab">End Date</label>
            <input
              type="date"
              className="inp"
              placeholder="Enter End Date"
              value={endDate}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <button
              className="btn"
              onClick={() => {
                createEvent();
              }}
            >
              {load ? <div className="loader"></div> : resp}
            </button>
          </div>
        </div>
      </div>
    );
}