import React from 'react'
import './break.css';
import { logoipsum, hsa_logo, js_mastery } from './imports';


//Component nur zum hübsch aussehen da
const Break = () => {
    return (
        <div className='wum__break section__padding'>
            <div>
                <img src={hsa_logo} alt="hsa-logo" />
            </div>
            <div>
                <img src={logoipsum} alt="logoipsum" />
            </div>
            <div>
                <img src={js_mastery} alt="js_mastery" />
            </div>
        </div>
    )
}

export default Break
