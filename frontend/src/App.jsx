import './App.css';
import t2 from "./assets/t2.jpg";
import axios from "axios";
import * as request from "./requests/request";
import { useEffect, useState } from "react";

// ✴
function App() {

  const [events, setEvents] = useState([]);
  const [finevents, setFinEvents] = useState([...events]);

  const fetchEvents = async () => {
    const response = await request.getRequest("/events/");
    setEvents(response?.events);
    setFinEvents(response?.events);
    console.log(response?.events);
  };
  useEffect(() => {
    fetchEvents()
  }, []);


  const [name, setName] = useState("");
  const [start, setStart] = useState("");

  const filter = () => {
    setFinEvents(
      events.filter(
        (ev) =>
          ev.name.toLowerCase().includes(name.toLowerCase()) &&
          (!start || ev.startDate === (new Date(start)).toISOString())
      )
    );
  }

  useEffect(() => filter(), [name, start]);

  return (
    <>
      <div className="container">
        <div className="nav">
          <div className="menu">
            <a href="/" className="link">
              Home
            </a>
            <a href="/#explore" className="link">
              Explore
            </a>
            <a href="/createEvent" className="link">
              Create
            </a>
          </div>
          <p className="logo">EVENT • HORIZON</p>
          {window.localStorage.getItem("token") != undefined ? (
            <>
              <a
                href="/createEvent"
                className="link dn"
                style={{ cursor: "pointer" }}
              >
                Create
              </a>
              <p
                onClick={() => {
                  window.localStorage.removeItem("token");
                  window.location.href = "/signin";
                }}
                className="link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </p>
            </>
          ) : (
            <a href="/signin" className="link">
              signin
            </a>
          )}
        </div>
        <div className="landing">
          <div className="title">
            <div>
              <p>
                Find Amazing <span>✴</span> events{" "}
              </p>{" "}
              <div className="tag mg"></div>
            </div>
            <div>
              <span>happening in your</span>
              <div className="tag"></div>
              <span className="mg">city</span>
            </div>
          </div>
          <p className="sub">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            quibusdam modi sunt magni consequuntur, quidem non. Repellat maiores
            earum qui, totam ipsum inventore a assumenda porro. Debitis
            quibusdam dolorum placeat!
          </p>
          <div className="section">
            <div className="side">
              <button className="btn">
                Explore Events
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            </div>
            <div className="side">
              <div className="tickets">
                <div className="ticket bg">
                  <div className="lt-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="center">
                    <p className="small">★★ Your Ticket ★★</p>
                    <p className="ttitle">One way Ticket</p>
                    <p className="small stars">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </p>
                  </div>
                  <div className="rt-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
                <div className="ticket">
                  <div className="lt-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="center">
                    <p className="small">★★ Your Ticket ★★</p>
                    <p className="ttitle">One way Ticket</p>
                    <p className="small stars">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </p>
                  </div>
                  <div className="rt-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="events" id="explore">
          <div className="strip">
            <p> ✴ New Events ✴ </p>
            <p> ✴ New Events ✴ </p>
            <p> ✴ New Events ✴ </p>
            <p> ✴ New Events ✴ </p>
          </div>
          <div className="filter">
            <div className="wrap">
              <p className="lab">Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="search by event name"
                className="inp"
              />
            </div>
            <div className="wrap">
              <p className="lab">Start Date</p>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                placeholder="search by date"
                className="inp"
              />
            </div>
            <div className="wrap">
              <p
                className="lab mb"
                style={{ color: "transparent", userSelect: "none" }}
              >
                button
              </p>
              <button
                className="src"
                onClick={() => {
                  setName("");
                  setStart("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div className="cards">
            {finevents?.map((event, i) => (
              <div className="card">
                <div
                  style={{ backgroundImage: `url(${event.banner})` }}
                  alt=""
                  className="banner"
                />
                <p
                  className="ename"
                  style={{ color: "orange", marginBottom: 8 }}
                >
                  {event.name}
                  <span className="tag">{event?.roomType}</span>
                </p>
                <p
                  className="esub"
                  style={{ marginBottom: "13px", color: "white" }}
                >
                  {event?.startDate?.split("T")[0]} to{" "}
                  {event?.endDate?.split("T")[0]}
                </p>
                <p className="esub">{event.description.slice(0, 70) + "..."}</p>
                <a
                  href={`/event/${event._id}`}
                  className="btn jn"
                  style={{ marginTop: 20 }}
                >
                  Join Event
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App
