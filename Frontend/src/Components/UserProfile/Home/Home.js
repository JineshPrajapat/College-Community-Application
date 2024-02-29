import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Home.scss';



const Home = () => {

  const userProfile ={
    hobbies:['Writing', 'Cycling', 'Badminton', 'Movies', 'Coding', 'Travel'],
    skills:['c++', 'Python', 'SQL', 'React', 'Machine Learning', 'Relational Databases', 'IOT'],
    resumeLink:"",
    Links:['https://github.com/JineshPrajapat', 'https://in.linkedin.com/in/jinesh-prajapat', ],
    currentstatus:"Student",
    state:"Rajasthan",
    experience:"Fresher",
    languages:['English', 'Hindi']
  
  }

  const hobbiesList = userProfile.hobbies.map((hobby)=>{
    return <li>{hobby}</li>;
  })
  const skillList = userProfile.skills.map((skill) => {
    return <li>{skill}</li>;
  });

  return (
    <div className="tab-pane">
      <div className="row-division">
        {/* left side */}
        <div className="left-pane">
          <div className="hobbies-container">
            <h4 className="title">Hobbies</h4>
            <ul className="hobbies-list">
              {hobbiesList}
            </ul>
          </div>
          <div className="reference-container">
            <h4 className="title">References</h4>
            <div className="refer">
              <p><b>Kishan Bhatti</b> Web Developer, Armax</p>
              <span >Phone: +91 8902347343</span>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="right-panel">
          <div className="skills-container">
            <h3 className="title">Skills</h3>
            <ul className="skills-list">
              {skillList}
            </ul>
          </div>

          <div className="links-container">
            <div className="hire-social-link">
              <ul className="hire-link">
                <li>
                  <a href=""><i className='fas fa-paper-plane' /> Hire me</a>
                </li>
                <li>
                  <a href={userProfile.resumeLink}><i className='fas fa-cloud-download-alt' /> Download Resume</a>
                </li>
              </ul>
              <ul className="social-link">
                {/* <li>
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                </li> */}
                {/* <li>
                  <a href="#"><i className="fab fa-twitter" /></a>
                </li> */}
                <li>
                  <a href="https://www.linkedin.com/in/jinesh-prajapat"><i className="fab fa-linkedin-in" /></a>
                </li>
                <li>
                  <a href="https://github.com/JineshPrajapat"><i class="fa-brands fa-github" /></a>
                </li>
                {/* <li className='youtube'>
                  <a href="#"><i className="fab fa-youtube" /></a>
                </li> */}
              </ul>
            </div>
          </div>

          {/* current status of user */}
          <div className="jumbo-address">
            <div className="address-container">
              <table className="address-list">
                <tbody>
                  <tr>
                    <th>Position</th>
                    <td>{userProfile.currentstatus}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{userProfile.state}</td>
                  </tr>
                </tbody>
              </table>
              <table className="address-list">
                <tbody>
                  <tr>
                    <th>Experiance</th>
                    <td>{userProfile.experience}</td>
                  </tr>
                  <tr>
                    <th>Languages</th>
                    <td>{userProfile.languages}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
