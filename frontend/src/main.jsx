import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router"
import Signup from "./screens/signup";
import Signin from './screens/signin'
import CreateEvent from './screens/events'
import EventSpace from './screens/events/join'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      <Route path="/createEvent" element={<CreateEvent />} />
      <Route path="/event/:id" element={<EventSpace />} />
    </Routes>
  </BrowserRouter>
);
