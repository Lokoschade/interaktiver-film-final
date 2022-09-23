import React from 'react'
import './question.css'

const Question = ({ question, answer }) => {
    return (
      <div className='wum__help-container__question'>
        <div className='wum__help-container__question-title'>
          <div />
          <h1>{question}</h1>
        </div>
        <div className='wum__help-container__question-text'>
          <p>{answer}</p>
        </div>
      </div>
    )
  }

export default Question
