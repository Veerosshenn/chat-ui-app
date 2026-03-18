import React, { useState, useEffect, useRef } from 'react';
import { getChatbyUserID, addChat } from '../../services/api';
import './ChatWindow.css';

const MY_USER_ID = 5;

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getChatbyUserID(selectedUser.id).then(res => setMessages(res.data));
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    const chat = {
      fromUser: MY_USER_ID,
      toUser: selectedUser.id,
      message: msg
    };
    addChat(chat).then(() => {
      setMsg('');
      getChatbyUserID(selectedUser.id).then(res => setMessages(res.data));
    });
  };

  const filteredMessages = messages.filter(m =>
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chatwindow-container">
      <div className="chatwindow-header">
        <img className="chatwindow-avatar" src={selectedUser.profileImage} alt={selectedUser.username} />
        <div>
          <div className="chatwindow-username">{selectedUser.username}</div>
          <div className="chatwindow-role">{selectedUser.position || 'User'}</div>
        </div>
        <input
        className="chatwindow-search"
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      </div>
      <div className="chatwindow-messages">
        {filteredMessages.map((m, i) => (
          <div
            key={i}
            className={`chatwindow-message ${m.fromUser === MY_USER_ID ? 'me' : 'other'}`}
          >
            {m.fromUser !== MY_USER_ID && (
              <img className="chatwindow-message-avatar" src={selectedUser.profileImage} alt="" />
            )}
            <div className="chatwindow-message-bubble">{m.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatwindow-input-row">
        <input
          className="chatwindow-input"
          placeholder="Type a message..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button className="chatwindow-send-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;