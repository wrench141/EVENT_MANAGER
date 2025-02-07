import "./style.css";
import axios from "axios";
import { useState } from "react";
import { SERVER_API } from "../../keys";
import { useRef } from "react";
import {useNavigate} from "react-router"

export default function Signin(){

    const navigate = useNavigate();

    const [load, setLoad] = useState(false); 
    const [resp, setResp] = useState("Signin"); 


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const signinHandler = async() => {
      setLoad(true)
      const response = await axios
        .post(SERVER_API + "/auth/signin", {
          email,
          password,
        })
        .catch((err) => {
          return err.response;
        });
      if(response){
        setLoad(false);
        if(response.status == 200){
          setResp("Logged in");
          window.localStorage.setItem("token", response?.data.token);
          navigate("/")
        }else{
          setResp(response?.data.msg);
        }
      };

      setTimeout(() => {
        setResp("Signin");
      }, 2000)
    }

    return (
      <div className="scontainer">
        <p className="title">Welcome back to Event-Horizon</p>
        <p className="sub">Login to your account to access your fav events.</p>
        <div className="wrapper">
          <label className="lab">Email</label>
          <input
            type="email"
            className="inp"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="wrapper">
          <label className="lab">Password</label>
          <input
            type="text"
            className="inp"
            placeholder="Enter your own Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="lab"
            style={{ textAlign: "right", fontSize: "10px", color: "grey" }}
          >
            show password
          </label>
        </div>
        <div className="wrapper">
          <button className="btn" onClick={() => signinHandler()}>
            {load ? <div className="loader"></div> : resp}
          </button>
          <a
            href="/signup"
            className="lab"
            style={{
              textAlign: "center",
              color: "grey",
              marginTop: "10px",
              fontSize: "11px",
              textDecoration: "none",
            }}
          >
            Account doesn't exists? Create account
          </a>
        </div>
      </div>
    );
}