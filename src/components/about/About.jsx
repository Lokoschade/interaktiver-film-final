import React from 'react'
import './about.css'

const Header = () => {
  return (
    <div className='wum__header section__padding'>
      <div className='wum__header-content'>
        <h1 className='gradient__text'>What is this Website? And why?</h1>
        <p>This website was created in the course of a project for the web and media programming module of the Anhalt University of Applied Sciences. </p>
        <p>It was our goal to create a web service especially designed for people to watch films with interactive features.</p>
        <p>In our library you can choose one of the available movies. Near the end of a clip you have the option to choose between two different continuations for the story. Your choice will have an impact on how things within the story will develop and it will eventually determine the outcome.</p>
        <p>So choose wisely and have fun!</p>
      </div>
    </div>
  )
}

export default Header
