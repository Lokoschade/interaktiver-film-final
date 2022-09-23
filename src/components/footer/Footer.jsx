import React from 'react'
import './footer.css'
import logo from "../../assets/logo.svg"

const Footer = () => {
  return (
    <div className="wum__footer section__padding">
      <div className='wum__footer-links'>
        <div className='wum__footer-links_logo'>
          <img src={logo} alt="logo" />
          <p>This project was created at the Anhalt University of Applied Sciences under the supervision of Toni Barth.</p>
        </div>
        <div className='wum__footer-links_div'>
          <h4>Developer</h4>
          <p>Friederike Ratteit</p>
          <p>Tim Tekath</p>
        </div>
        <div className='wum__footer-links_div'>
          <h4>Contact</h4>
          <p>friederike.ratteit@student.hs-anhalt.de</p>
          <p>tim.tekath@student.hs-anhalt.de</p>
        </div>
      </div>
      <div className='wum__footer-copyright'>
        <p>This is the end of this site.</p>
      </div>
    </div>
  )
}

export default Footer
