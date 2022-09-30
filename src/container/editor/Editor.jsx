import React, { useState, useEffect } from 'react'
import './editor.css'
import { EditorClips } from '../../components'

export default function Editor() {
  const [clips, setClips] = useState([ 2, 3, 4, 5, 6, 7])
  const [options, setOptions] = useState(2)
  const [allOptions, setAllOptions] = useState([1, 1])
  const [movieName, setMovieName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const [showOtherInput, setShowOtherIput] = useState(false)
  const [dataString, setDataString] = useState('{')
  const [showChoices, setShowChoices] = useState([])
  const [counter, setCounter] = useState(0)
  //Variable um einen Key zu speichern bzw. ändern zu können um nach dem zurücksetzen der States neuzurendern
  const [uniqueId, setUniqueId] = useState('base')

  //setzt den Namen vom Film
  const handleNameSet = (e) => {
    e.preventDefault();
    setMovieName(movieName);
    setNameSet(true);
    setDataString(dataString + '"name":"' + movieName + '","clips":[{');
  }
  //zählt den Zähler für die Optionen hoch und erweitert das Array um die Optionen zu speichern
  const handleClick = () => {
    setOptions(options + 1);
    setAllOptions(current => [...current, 1]);
  }

  //speichert die ausgewählten Optionen
  const handleAllOptions = (index, e) => {
    const newOptions = Array.from(allOptions);
    newOptions[index] = parseInt(e.target.value);
    setAllOptions(newOptions);
  }

  //entfernt die Optionen aus der Auswahl
  const removeClips = (theOptions) => {
    setClips(current => current.filter(option => !theOptions.includes(option)))
  }

  //setzt den String für den POST zusammen
  const addString = (string) => {
    if (counter < allOptions.length - 1){
    setDataString(current => current + string)
    } else {
      setDataString(current => current + string + ']}')
    }
    setCounter(current => current+1)
  }

  //Postet den Film und setzt alle states zurück
  const postMovie = () => {
    fetch("https://gruppe7.toni-barth.com/movies/", {
      method: 'POST',
      body: dataString,
      headers: {'Content-Type': 'application/json'}
    })
    setClips([1, 2, 3, 4, 5, 6, 7])
    setOptions(2)
    setAllOptions([1, 1])
    setMovieName('')
    setNameSet(false)
    setShowOtherIput(false)
    setDataString('{')
    setShowChoices([])
    setCounter(0)
    setUniqueId(Math.random().toString())
  }

  //handled den ersten Submit
  const handleSubmit = () => {
    removeClips(allOptions);
    setDataString(dataString + '"id":1,"link":"https://gitlab.hs-anhalt.de/barth_to/interactive-clip/-/raw/master/movies/clip1.webm","options":[' + allOptions.toString() + ']}');
    setShowChoices(current => [...current, "Clip 1 Options: [ " + allOptions.toString() + " ]"]);
    setShowOtherIput(true);
  }

  //hört auf die Änderung von clips, damit die Auswahl angepasst wird
  useEffect(() => {
  }, [clips])

  return (
    <div key={uniqueId} className='wum__editor section__padding'>
      <div>{showChoices.map((text, i) => <p key={i}>{text}</p>)}</div>

      {/* Wird  solange angezeigt bis der Name gesetzt ist */}
      {!nameSet
        ? <form onSubmit={(e) => handleNameSet(e)}>
          <p>What's the name of your movie?</p>
            <input
              type='text'
              value={movieName}
              required
              onChange={(e) => setMovieName(e.target.value)}
            />
          <input id='button' type='submit' value='Submit' />
        </form>
        : <>
        {/* Wird solange angezeigt, bis der Clip mit der Auswahl eingefügt wurde */}
          {!showOtherInput
            ? <>
              <p>Clip 1 Options:
                {Array.from(Array(options)).map((c, index) => {
                  return <select key={c} onChange={(e) => handleAllOptions(index, e, 0)}>{clips.map((item, i) => <option key={i} value={item}>Clip {item}</option>)}</select>
                })} </p>
                <div className='wum__editor-buttons'>
                <button onClick={handleClick}>Add options</button>
                <button onClick={handleSubmit}>Submit</button>
                </div>
            </>
            : <> {<div classname='wum__editor-clips'> {allOptions.map((oldOption, i) => <EditorClips key={i} oldOption={oldOption} clips={clips} setShowChoices={setShowChoices} removeClips={removeClips} addString={addString}/>)}</div>}
                  {clips.length - 1 === 0 ? <button onClick={postMovie}>Done</button> : null}
            </>}
        </>
      }
    </div>
  )
}
