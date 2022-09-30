import React, { useState, useRef, useCallback } from 'react'
import ReactPlayer from 'react-player'

export default function Player({ movies, time, onDuration, onProgress }) {

    const [isReady, setIsReady] = useState(false);
    const playerRef = useRef();

    //spult im Player zur gewünschten Stelle beim Start
    const onReady = useCallback(() => {
        if (!isReady) {
            playerRef.current.seekTo(time, "seconds");
            setIsReady(true);
        }
    }, [isReady, time]);

    return (
        <div>
            <ReactPlayer
                className='react-player'
                ref={playerRef}
                url={movies.link}
                width='100%'
                height='100%'
                controls={true}
                onReady={onReady}
                /* gibt die Länge des aktuell geladenen Clips weiter */
                onDuration={onDuration}
                /* gibt in diesem Fall die abgespielten Sekunden weiter */
                onProgress={onProgress}
            />
        </div>
    )
}
