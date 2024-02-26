import React from 'react'
import { images } from '../../constants'
import './Footer.scss'

function Footer() {
    return (
        <footer>
            <div className="app_footer">
                <div className='app__footer-logo'>
                    <ul>
                        <li><img src={images.srijanlogo} className='logok' alt="logo" /></li>
                        <li><h6>All rights reserved.</h6></li>
                    </ul>
                </div>
                <div className='footer_company-link'>
                    <ul>
                        <li className="app_footer-heading">The Company</li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Roadmap</a></li>
                    </ul>
                </div>
                <div className='footer_community-link'>
                    <ul>
                        <li className="app_footer-heading">Community</li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Youtube</a></li>
                        <li><a href="#">Discord</a></li>
                    </ul>
                </div>
                <div className='footer_legal-link'>
                    <ul>
                        <li className="app_footer-heading">Legal</li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                    </ul>
                </div>
                <div className='app__footer-social-media-icons'>
                    <a href="https://www.instagram.com">
                        <img src={images.instagram} alt="Instagram" />
                    </a>
                    <a href="https://www.youtube.com">
                        <img src={images.youtube} alt="YouTube" />
                    </a>
                    <a href="https://www.twitter.com">
                        <img src={images.twitter} alt="Twitter" />
                    </a>
                    <a href="https://www.linkedin.com">
                        <img src={images.linkedin} alt="LinkedIn" />
                    </a>
                </div>
            </div>

            <hr></hr>
            
            <ul className="app_footer-hr">
                <li><a href="mailto:mail@careerprephub.com">mail@careerprephub.com</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Services</a></li>
            </ul>
        </footer>
    )
}

export default Footer;