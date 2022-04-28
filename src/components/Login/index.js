import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMessage: '',
    isError: false,
    isPasswordType: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errTxt => {
    this.setState({
      errMessage: errTxt,
      isError: true,
    })
  }

  onSubmitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isPasswordType: !prevState.isPasswordType}))
  }

  render() {
    const {username, password, errMessage, isError, isPasswordType} = this.state
    const passwordType = isPasswordType ? 'text' : 'password'
    return (
      <div className="login-bg-container">
        <div className="login-card shadow">
          <form onSubmit={this.onSubmitForm}>
            <div className="text-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="login theme"
                className="website-icon"
              />
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                className="login-input"
                id="username"
                placeholder="Username"
                onChange={this.onChangeUserName}
                value={username}
              />
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type={passwordType}
                className="login-input"
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <div className="mb-3">
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.onClickCheckbox}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Password
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            {isError ? <p className="err-txt">* {errMessage}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
