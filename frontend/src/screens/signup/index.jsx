import { useState } from "react";
import "./style.css";
import axios from "axios";
import { SERVER_API } from "../../keys";
import {useNavigate} from "react-router"
export default function Signup(){
    const [load, setLoad] = useState(false);
    const [resp, setResp] = useState("Create Account"); 
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const navigate = useNavigate();
    const signupHandler = async () => {
      setLoad(true);
      const response = await axios
        .post(SERVER_API + "/auth/signup", {
          email,
          password,
        })
        .catch((err) => {
          return err.response;
        });
      if (response) {
        setLoad(false);
        if (response.status == 200) {
          setResp("Account Created");
          window.localStorage.setItem("token", response?.data.token);
          navigate("/");
        } else {
          setResp(response?.data.msg);
        }
      }

      setTimeout(() => {
        setResp("Create Account");
      }, 2000);
    };

    return (
      <div className="scontainer">
        <p className="title">Welcome to Event-Horizon</p>
        <p className="sub">
          Create a free EH account to host your custom events.
        </p>
        <div className="wrapper">
          <label className="lab">Email</label>
          <input
            type="email"
            className="inp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>
        <div className="wrapper">
          <label className="lab">Password</label>
          <input
            type="text"
            className="inp"
            placeholder="Enter your own Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
          <label
            className="lab"
            style={{ textAlign: "right", fontSize: "10px", color: "grey" }}
          >
            show password
          </label>
        </div>
        <div className="wrapper">
          <button className="btn" onClick={() => signupHandler()}>
            {load ? <div className="loader"></div> : resp}
          </button>
          <a
            href="/signin"
            className="lab"
            style={{
              textAlign: "center",
              color: "grey",
              marginTop: "10px",
              fontSize: "11px",
              textDecoration: "none",
            }}
          >
            Account already exists? Login
          </a>
        </div>
      </div>
    );
}