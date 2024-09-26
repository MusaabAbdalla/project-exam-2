import Layout from "./components/Layout";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/about";
import Contact from "./routes/contact";
import Login from "./routes/Login";
import SignUp from "./routes/signup";
import Profile from "./routes/profile";
import Venue from "./routes/venue";
import CreateNewVenue from "./routes/createNewVenue";

function VenueWrapper() {
  const params = useParams();
  const { id } = params;
  return <Venue id={id} />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venues/:id" element={<VenueWrapper />} />
          <Route path="contact" element={<Contact />} />
          <Route path="About" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="createvenue" element={<CreateNewVenue />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
