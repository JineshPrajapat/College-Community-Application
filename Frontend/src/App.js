import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import ReactRouterDom from "react-router-dom";
import { useEffect, useState,useSelector } from "react";
import WebFont from "webfontloader";
import LoginSignUp from "./Components/User/LoginSignUp";
import store from "./store";
import axios from "axios";
import { loadUser } from "./actions/userAction";




function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);



  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"],
  //     },
  //   });

  //   store.dispatch(loadUser());

  // }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>  
      <div className="App">
      <header className="App-header">
        <h1>CareerPrepHub</h1>
      </header>
     
      <Switch>
      <Route exact path="/login" component={LoginSignUp} />

      </Switch>
    
      <Question/>
      <Users/>
      <ImageCarousel/>
      <Opportunity/>
      <Experience/>
      <QuestionForm />
      <ExperienceForm/>
      <OpportunityForm/>
      <Discuss/>
      <AddQuery/>
      <Placement/>
      <PlacementsForm/>
    </div>
    </Router>
  );
}

export default App;
