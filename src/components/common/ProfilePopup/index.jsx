import React from 'react'
import { onLogout } from '../../../api/AuthAPI'
import './index.scss'

function ProfilePopup() {
  return (
    <div className='popup-card'>
        <ul className='popup-options'>
            <li className='popup-option' onClick={onLogout}>Logout</li>
        </ul>
    </div>
  )
}

export default ProfilePopup