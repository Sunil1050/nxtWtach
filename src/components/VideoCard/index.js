import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import './index.css'

const VideoCard = props => {
  const {videoCardDetails} = props
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoCardDetails
  const {name, profileImageUrl} = channel
  const dateObj = formatDistanceToNow(new Date(publishedAt))
  return (
    <li className="col-6 col-md-4">
      <img src={thumbnailUrl} className="w-100" alt={title} />
      <div className="text-white d-flex p-3">
        <img
          src={profileImageUrl}
          alt={`channel ${name}`}
          className="channel-img"
        />
        <div>
          <h6 className="text-dark">{title}</h6>
          <div className="channel-details-container">
            <p className="channel-details">{name}</p>
            <div className="d-flex">
              <p className="channel-details">{viewCount}</p>
              <BsDot className="dot-icon" />
              <p className="channel-details">{dateObj} ago</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
export default VideoCard
