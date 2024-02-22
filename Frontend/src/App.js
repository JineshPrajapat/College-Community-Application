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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CareerPrepHub</h1>
      </header>
      {/* <Question/>
      <Users/>
      <ImageCarousel/>
      <Opportunity/>
      <Experience/>
      <QuestionForm />
      <ExperienceForm/>
      <OpportunityForm/>
      <Discuss/>
      <AddQuery/> */}
      {/* <Placement/> */}
      <PlacementsForm/>
    </div>
  );
}

export default App;
