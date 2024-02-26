import logo from "./logo.svg";
import "./App.css";
import Question from "./Components/Questions/Questions";
import Users from "./Components/Users/Users";
import ImageCarousel from "./Components/ImageCarousel/ImageCarousel";
import Opportunity from "./Components/Opportunity/Opportunity";
import Experience from "./Components/Experience/Experience";
import QuestionForm from "./Components/Questions/QuestionForm/QuestionForm";
import ExperienceForm from "./Components/Experience/ExperienceForm/ExperienceForm";
import OpportunityForm from "./Components/Opportunity/OpportunityForm/OpportunityForm";
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
import CoverPage from "./Components/CoverPage/CoverPage";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/SignIn/SignIn";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import UpdateProfileSettings from "./Components/UserProfile/UpdateProfileSettings/UpdateProfileSettings";
import UserProfileSettings from "./Components/UserProfile/UserProfileSettings/UserProfileSettings";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>CareerPrepHub</h1>
        <NavBar />
      </header> */}
      <Header/>
      <CoverPage/>
      <Routes >
        <Route path="/" element={<Landing/>} />
        <Route path="Users" element={<Users />} />
        <Route path="Questions/*" element={<Question />} />
        <Route path="Opportunity/*" element={<Opportunity />} />
        <Route path="Experience/*" element={<Experience />} />
        <Route path="Discuss/*" element={<Discuss />} />
        <Route path="PlacementStats" element={<Placement />} />
        <Route path="UserProfile/*" element={<UserProfile />} />
        <Route path="Signup/*" element={<SignUp/>} />
        <Route path="Login/*" element={<Login/>} />
        <Route path="ForgetPassword" element={<ForgetPassword/>} />
      </Routes>

      {/* <UpdateProfileSettings/> */}

      {/* <Question/>/ */}
      {/* <Users/> */}
      <ImageCarousel/>
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
      <Footer/>
      
    </div>
  );
}

export default App;
