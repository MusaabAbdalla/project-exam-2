import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/about";
import Contact from "./routes/contact";
import Login from "./routes/login";
import Profile from "./routes/profile";
import Venue from "./routes/venue";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue" element={<Venue />} />
          <Route path="contact" element={<Contact />} />
          <Route path="About" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
