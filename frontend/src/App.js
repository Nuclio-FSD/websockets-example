import './App.css';
import {useEffect, useState} from 'react';
import Message from './components/Message';

function App({socket}) {
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');
    const [textToSend, setTextToSend] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            setMessages(current => [...current, {user: 'Bot', text: 'Bienvenidx a la sala de chat 👋'}]);
            setUserName(socket.id);
        });

        socket.on('msg', ({user, text}) => {
            setMessages(current => [...current, {user, text}]);
        });

        return () => {
            socket.off('msg');
        };
    }, []);

    const handleClick = () => {
        if (!userName || !textToSend) return;
        socket.emit('msg', {user: userName, text: textToSend});
    }

    return (
        <div className='App'>
            <div>
                <ul>
                    {messages.length > 0 && messages.map(message => <li><Message user={message.user}
                                                                                 text={message.text}/></li>)}
                </ul>
                <input placeholder='Tu nombre' value={userName} type='text'
                       onChange={(e) => setUserName(e.target.value)}/>
                <input placeholder='Tu mensaje' type='text' onChange={(e) => setTextToSend(e.target.value)}/>
                <button onClick={handleClick}>Enviar mensaje</button>
            </div>

        </div>
    );
}

export default App;
