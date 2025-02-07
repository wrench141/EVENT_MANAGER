import './App.css';
import t2 from "./assets/t2.jpg";
// ✴
function App() {
  return (
    <>
      <div className="container">
        <div className="nav">
          <div className="menu">
            <a href="/" className="link">
              Home
            </a>
            <a href="/" className="link">
              Explore
            </a>
            <a href="/" className="link">
              Create
            </a>
          </div>
          <p className="logo">EVENT-X</p>
          <a href="/signin" className="link">
            signin
          </a>
        </div>
        <div className="landing">
          <div className="title">
            <div>
              <p>
                Find Amazing <span>✴</span> events{" "}
              </p>{" "}
              <div className="tag"></div>
            </div>
            <div>
              <p>happening in your</p>
              <div className="tag"></div>
              <p>city</p>
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
        <div className="events">
          <div className="strip">
              <p> ✴ New Events ✴ </p>
              <p> ✴ New Events ✴ </p>
              <p> ✴ New Events ✴ </p>
              <p> ✴ New Events ✴ </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
