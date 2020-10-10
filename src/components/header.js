import React from "react"
import { Link } from 'react-router-dom'

const Header = ({setMenuState, setCursor}) => {
  return (
    <header>
      <div className="container fluid">
        <div className="header-inner">
          <Link to="/">
            Pocket.
          </Link>
          <div
            className="hamburger-menu"
            onClick={() => setMenuState(state => !state)}
            onMouseEnter={() => setCursor(true)}
            onMouseLeave={() => setCursor(false)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header