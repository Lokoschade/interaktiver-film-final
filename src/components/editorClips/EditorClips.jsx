import React, { useState } from 'react'
import './editorClips.css'

export default function EditorClips({ oldOption, clips, setShowChoices, removeClips, addString }) {
    const [options, setOptions] = useState(2)
    const [allOptions, setAllOptions] = useState([1, 1])
    const [remove, setRemove] = useState(false)

    const handleClick = () => {
        setOptions(options + 1);
        setAllOptions(current => [...current, 1]);
    }
    const handleClick2 = () => {
        setAllOptions([]);
        handleSubmit([]);
    }

    const handleAllOptions = (index, e) => {
        const newOptions = Array.from(allOptions);
        newOptions[index] = parseInt(e.target.value);
        setAllOptions(newOptions);
    }

    const handleSubmit = () => {
        addString(',{"id":"' + oldOption + '","link":"https://gitlab.hs-anhalt.de/barth_to/interactive-clip/-/raw/master/movies/clip' + oldOption + '.webm","options":[' + allOptions.toString() + ']}')
        setShowChoices(current => [...current, "Clip " + oldOption + " Options: [ " + allOptions.toString() + " ]"]);
        removeClips(allOptions);
        setRemove(true);
    }

    return (
        <div> {!remove
            ? <label>Clip {oldOption} Options: {Array.from(Array(options)).map((c, index) => {
                return <select key={c} onChange={(e) => handleAllOptions(index, e)}>{clips.map((item, i) => <option key={i} value={item}>Clip {item}</option>)}</select>
            })}
                <button onClick={handleClick}>More options</button>
                <button onClick={handleClick2}>No options</button>
                <button onClick={handleSubmit}>Add</button>
            </label>
            : null
        }

        </div>
    )
}
