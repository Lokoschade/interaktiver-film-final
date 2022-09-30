import React, { useState } from 'react'
import './editorClips.css'

export default function EditorClips({ oldOption, clips, setShowChoices, removeClips, addString }) {
    const [options, setOptions] = useState(2)
    const [allOptions, setAllOptions] = useState([1, 1])
    const [remove, setRemove] = useState(false)

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

    //handled den jeweiligen Submit vom EditorClips-Element
    const handleSubmit = () => {
        var endMovies = allOptions.map((option) => '{"id":' + option + ',"link":"https://gitlab.hs-anhalt.de/barth_to/interactive-clip/-/raw/master/movies/clip' + option + '.webm","options":[]}')
        addString(',{"id":' + (oldOption) + ',"link":"https://gitlab.hs-anhalt.de/barth_to/interactive-clip/-/raw/master/movies/clip' + oldOption + '.webm","options":[' + allOptions.toString() + ']},' + endMovies.toString())
        setShowChoices(current => [...current, "Clip " + oldOption + " Options: [ " + allOptions.toString() + " ]"]);
        removeClips(allOptions);
        setRemove(true);
    }

    return (
        <div className='wum__editorClip'> {!remove
            ? <div className='wum__editorClip-element'>
                <div className='wum__editorClip-options'>
                    <p>Clip {oldOption}  Options: </p> {Array.from(Array(options)).map((c, index) => {
                        return <select key={c} onChange={(e) => handleAllOptions(index, e)}>{clips.map((item, i) => <option key={i} value={item}>Clip {item}</option>)}</select>
                    })}</div>
                <div className='wum__editorClip-buttons'>
                    <button onClick={handleClick}>More options</button>
                    <button onClick={handleSubmit}>Add</button>
                </div>
            </div>

            : null
        }
        </div>
    )
}
