import bot from '../assets/robot-icon.png';
import './Avatar.css'

const Avatar = ({user}) => {
    return (
        <div className="avatar-div">
            {user === 'Bot' ?
                <img src={bot} className="avatar-img" alt=""/> :
                user.substr(0, 2)}
        </div>
    )
}

export default Avatar;