import React, { useState, useEffect } from 'react'
import './editor.css'
import { EditorClips } from '../../components'

export default function Editor() {
  const [clips, setClips] = useState([1, 2, 3, 4, 5, 6, 7])
  const [options, setOptions] = useState(2)
  const [firstClip, setFirstClip] = useState(1)
  const [allOptions, setAllOptions] = useState([1, 1])
  const [movieName, setMovieName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const [showOtherInput, setShowOtherIput] = useState(false)
  const [dataString, setDataString] = useState('{')
  const [showChoices, setShowChoices] = useState([])
  const [counter, setConter] = useState(0)

  const handleNameSet = (e) => {
    e.preventDefault();
    setMovieName(movieName);
    setNameSet(true);
    setDataString(dataString + '"name":"' + movieName + '","clips":[{');
  }

  const handleClick = () => {
    setOptions(options + 1);
    setAllOptions(current => [...current, 1]);
  }

  const handleAllOptions = (index, e) => {
    const newOptions = Array.from(allOptions);
    newOptions[index] = parseInt(e.target.value);
    setAllOptions(newOptions);
  }

  const removeClips = (theOptions) => {
    setClips(current => current.filter(option => !theOptions.includes(option)))
  }

  const addString = (string) => {
    if (counter < allOptions.length - 1){
    setDataString(current => current + string)
    } else {
      setDataString(current => current + string + ']}')
      postMovie();
    }
    setConter(current => current+1)
  }

  const postMovie = () => {
    console.log(dataString)
    // fetch("https://gruppe7.toni-barth.com/movies/", {
    //   method: 'POST',
    //   body: dataString,
    //   headers: {'Content-Type': 'application/json'}
    // })
  }

  const handleSubmit = () => {
    removeClips(allOptions);
    setDataString(dataString + '"id":"' + firstClip + '","link":"https://gitlab.hs-anhalt.de/barth_to/interactive-clip/-/raw/master/movies/clip' + firstClip + '.webm","options":[' + allOptions.toString() + ']}');
    setShowChoices(current => [...current, "Clip " + firstClip + " Options: [ " + allOptions.toString() + " ]"]);
    setShowOtherIput(true);
  }

  useEffect(() => {
  }, [clips])

  return (
    <div className='wum__editor section__padding'>
      {showChoices.map((text, i) => <p key={i}>{text}</p>)}
      {!nameSet
        ? <form onSubmit={(e) => handleNameSet(e)}>
          <label>
            What's the name of your movie?
            <input
              type='text'
              value={movieName}
              required
              onChange={(e) => setMovieName(e.target.value)}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
        : <>
          {!showOtherInput
            ? <>
              <select onChange={(e) => setFirstClip(parseInt(e.target.value))}>
                {clips.map((item, i) => <option key={i} value={item}>Clip {item}</option>)}
              </select>
              <label> Options:
                {Array.from(Array(options)).map((c, index) => {
                  return <select key={c} onChange={(e) => handleAllOptions(index, e, 0)}>{clips.map((item, i) => <option key={i} value={item}>Clip {item}</option>)}</select>
                })}
                <button onClick={handleClick}>More options</button>
                <button onClick={handleSubmit}>Add</button>
              </label>
            </>
            : <> {allOptions.map((oldOption, i) => <EditorClips key={i} oldOption={oldOption} clips={clips} setShowChoices={setShowChoices} removeClips={removeClips} addString={addString}/>)}
            </>}
        </>
      }
    </div>
  )
}
