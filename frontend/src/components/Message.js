import Avatar from './Avatar';
import './Message.css';

const Message = ({user, text}) => {
    return (
        <div className='message'>
            <Avatar user={user}/>
            <div>
                <p className='username'>{user}</p>
                {text}
            </div>
        </div>
    )
}

export default Message;