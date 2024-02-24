import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Home.scss';

const Home = () => {
  return (
    <div className="tab-pane">
      <div className="row-division">
        {/* left side */}
        <div className="left-pane">
          <div className="hobbies-container">
            <h4 className="title">Hobbies</h4>
            <ul className="hobbies-list">
              <li>Writing</li>
              <li>Cycling</li>
              <li>Badminton</li>
              <li>Movies</li>
              <li>Coding</li>
              <li>Travel</li>
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
              <li>C++</li>
              <li>Python</li>
              <li>SQL</li>
              <li>React</li>
              <li>Machine Learning</li>
              <li>Relational Databases</li>
              <li>IOT</li>
            </ul>
          </div>

          <div className="links-container">
            <div className="hire-social-link">
              <ul className="hire-link">
                <li>
                  <a href=""><i className='fas fa-paper-plane' /> Hire me</a>
                </li>
                <li>
                  <a href=""><i className='fas fa-cloud-download-alt' /> Download Resume</a>
                </li>
              </ul>
              <ul className="social-link">
                <li>
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                </li>
                <li>
                  <a href="#"><i className="fab fa-twitter" /></a>
                </li>
                <li>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                </li>
                <li>
                  <a href="#"><i class="fa-brands fa-github" /></a>
                </li>
                <li className='youtube'>
                  <a href="#"><i className="fab fa-youtube" /></a>
                </li>
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
                    <td>Student</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>Rajasthan</td>
                  </tr>
                </tbody>
              </table>
              <table className="address-list">
                <tbody>
                  <tr>
                    <th>Experiance</th>
                    <td>Fresher</td>
                  </tr>
                  <tr>
                    <th>Languages</th>
                    <td>Hindi, English</td>
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
