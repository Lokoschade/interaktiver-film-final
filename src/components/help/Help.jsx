import React from 'react'
import './help.css'
import { Question } from '../../components'

//Array der Inhalte die an die Question Component weitergegben werden sollen
const helpFAQ = [
  {
    question: 'How do I select a movie?',
    answer: 'First you go to our movie selection section. There you only need to click on whichever movie you want to watch. After that a video player pops up above that and you can watch it.'
  },
  {
    question: "My movie was only 30 seconds long and didn't have any concusion!",
    answer: "Don't worry, you probably only saw the first clip of your selected movie. Since those are interactive movies you are given a choice 10 seconds before the clip ends. To choose how the story continues select one of the options that are available under the video player."
  },
  {
    question: "I accidentally chose the wrong movie, what do I do now?",
    answer: "That's no problem! You can just scroll up to our movie selection section and click on you prefered movie. It will pop up just like the other one before."
  }

]

const Help = () => {
  return (
    <div className='wum__help section__padding'>
      <div className='wum__help-container'>
        {/* rendere die Component Question, so oft, wie Elemente im Array helpFAQ sind */}
        {helpFAQ.map((item, index) => (
          <Question question = {item.question} answer = {item.answer} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Help
