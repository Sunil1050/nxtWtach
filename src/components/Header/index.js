import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <div className="mobile-navbar container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div>
          <FaMoon className="mobile-nav-icon" />
          <GiHamburgerMenu className="mobile-nav-icon" />
          <FiLogOut className="mobile-nav-icon" onClick={onLogout} />
        </div>
      </div>
      <div className="desktop-navbar container-fluid">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div>
          <FaMoon className="desktop-nav-icon" />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="profile"
          />
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
export default withRouter(Header)
