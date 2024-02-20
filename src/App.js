import logo from './logo.svg';
import './App.css';
import Question from './Components/Questions/Questions';
import Users from './Components/Users/Users';
import ImageCarousel from './Components/ImageCarousel/ImageCarousel';
import Opportunity from './Components/Opportunity/Opportunity';
import Experience from './Components/Experience/Experience';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Placement Opportunity</h1>
      </header>
      <Question/>
      {/* <Users/> */}
      {/* <ImageCarousel/> */}
      {/* <Opportunity/> */}
      {/* <Experience/> */}
    </div>
  );
}

export default App;
