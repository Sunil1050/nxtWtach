import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillHome, AiOutlineSearch} from 'react-icons/ai'
import {BiTrendingUp} from 'react-icons/bi'
import {SiYoutubegaming} from 'react-icons/si'
import {FiDownload} from 'react-icons/fi'
import {GrFormClose} from 'react-icons/gr'
import Header from '../Header'
import VideoCard from '../VideoCard'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getAllHomeVideos()
  }

  getFormattedChannelData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
  })

  getAllHomeVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all?search='
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(homeVideosApiUrl, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.videos.map(item => ({
        channel: this.getFormattedChannelData(item.channel),
        id: item.id,
        publishedAt: item.published_at,
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      this.setState({
        videosList: formattedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getAllHomeVideos()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {videosList} = this.state
    return (
      <ul type="none" className="pl-0">
        <div className="row">
          {videosList.map(item => (
            <VideoCard videoCardDetails={item} />
          ))}
        </div>
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="w-50"
      />
      <h2 className="text-dark">Oops! Something went wrong</h2>
      <p className="home-failure-desc">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        className="home-retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {/* Banner */}
        <div className="container-fluid">
          <div className="row">
            <div className="home-navbar d-none d-md-block col-md-3">
              <div>
                <div className="d-flex">
                  <AiFillHome className="nav-icons" />
                  <p className="nav-text">Home</p>
                </div>
                <div className="d-flex">
                  <BiTrendingUp className="nav-icons" />
                  <p className="nav-text">Trending</p>
                </div>
                <div className="d-flex">
                  <SiYoutubegaming className="nav-icons" />
                  <p className="nav-text">Gaming</p>
                </div>
                <div className="d-flex">
                  <FiDownload className="nav-icons" />
                  <p className="nav-text">Saved Videos</p>
                </div>
              </div>
              <div>
                <h5 className="text-dark">CONTACT US</h5>
                <div className="d-flex">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-media-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                    className="social-media-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                    alt="linkedin logo"
                    className="social-media-logo"
                  />
                </div>
                <h6 className="text-dark">
                  Enjoy! Now to see your channels and recommendations!
                </h6>
              </div>
            </div>
            <div className="col-md-9">
              <div className="banner-container col-12">
                <div className="banner-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="banner-logo"
                  />
                  <p className="banner-desc">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button type="button" className="get-now-button">
                    GET NOW
                  </button>
                </div>
                <GrFormClose className="close-icon" />
              </div>
              {/* Search-Container */}
              <div className="search-container col-7">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                />
                <button type="button" className="search-button">
                  <AiOutlineSearch className="search-icon" />
                </button>
              </div>
              {this.renderAll()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Home
