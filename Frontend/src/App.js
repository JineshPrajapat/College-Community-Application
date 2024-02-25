import logo from "./logo.svg";
import "./App.css";
import Question from "./Components/Questions/Questions";
import Users from "./Components/Users/Users";
import ImageCarousel from "./Components/ImageCarousel/ImageCarousel";
import Opportunity from "./Components/Opportunity/Opportunity";
import Experience from "./Components/Experience/Experience";
import QuestionForm from "./Components/QuestionForm/QuestionForm";
import ExperienceForm from "./Components/ExperienceForm/ExperienceForm";
import OpportunityForm from "./Components/OpportunityForm/OpportunityForm";
import Discuss from "./Components/Discuss/Discuss";
import AddQuery from "./Components/Discuss/AddQuery/AddQuery";
import Placement from "./Components/Placements/Placement";
import PlacementsForm from "./Administration/PlacementForm/PlacementForm";
import Notes from "./Components/Notes/Notes";
import UserProfile from "./Components/UserProfile/UserProfile";
// import Home from "./Components/UserProfile/Home/Home";
import Landing from "./Components/Landing/Landing";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Routes } from 'react-router-dom';
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CareerPrepHub</h1>
        <NavBar />
      </header>
      <Routes >
        <Route path="/" element={<Landing/>} />
        <Route path="users" element={<Users />} />
        <Route path="questions" element={<Question />} />
        <Route path="opportunity" element={<Opportunity />} />
        <Route path="experience" element={<Experience />} />
        <Route path="discuss/*" element={<Discuss />} />
        <Route path="placementStats" element={<Placement />} />
        <Route path="userProfile/*" element={<UserProfile />} />
      </Routes>


      {/* <Question/>/ */}
      {/* <Users/> */}
      {/* <ImageCarousel/> */}
      {/* <Opportunity/> */}
      {/* <Experience/> */}
      {/* <QuestionForm /> */}
      {/* <ExperienceForm/> */}
      {/* <OpportunityForm/> */}
      {/* <Discuss/> */}
      {/* <AddQuery/> */}
      {/* <Placement/> */}
      {/* <PlacementsForm/> */}
      {/* <Notes/> */}
      {/* <UserProfile/> */}
      <Home></Home>
    </div>
  );
}

export default App;
