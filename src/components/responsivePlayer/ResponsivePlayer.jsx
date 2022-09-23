import React from 'react'
import ReactPlayer from 'react-player'

const ResponsivePlayer = ({ url }) => {
  return (
      <div className='wum__responsivePlayer section__padding'>
        <ReactPlayer
          className='react-player'
          url={url}
          width='100%'
          height='100%'
          controls={true}
        />
      </div>
  )
}

export default ResponsivePlayer
