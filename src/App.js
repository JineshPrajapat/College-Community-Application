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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Placement Opportunity</h1>
      </header>
      {/* <Question/> */}
      {/* <Users/> */}
      {/* <ImageCarousel/> */}
      {/* <Opportunity/> */}
      {/* <Experience/> */}
      {/* <QuestionForm /> */}
      {/* <ExperienceForm/> */}
      <OpportunityForm/>
    </div>
  );
}

export default App;
