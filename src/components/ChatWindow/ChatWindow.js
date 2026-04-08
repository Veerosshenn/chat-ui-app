import React, { useState, useEffect, useRef } from 'react';
import { getChatbyUserID, addChat } from '../../services/api';
import { CircularProgress, Alert } from '@mui/material';
import './ChatWindow.css';

const MY_USER_ID = 5;

const ChatWindow = ({ selectedUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError('');

    if (selectedUser) {
      let isMounted = true;

      getChatbyUserID(selectedUser.id)
        .then((res) => {
          if (isMounted) {
            setMessages(res.data);
          }
        })
        .catch(() => {
          if (isMounted) {
            setError('Unable to load conversation');
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
    setLoading(false);
    return undefined;
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, search]);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    const chat = {
      fromUser: MY_USER_ID,
      toUser: selectedUser.id,
      message: msg
    };

    setSending(true);
    setError('');

    try {
      await addChat(chat);
      setMsg('');
      const response = await getChatbyUserID(selectedUser.id);
      setMessages(response.data);
    } catch {
      setError('Unable to send message');
    } finally {
      setSending(false);
    }
  };

  const filteredMessages = messages.filter(m =>
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  const hasNoMatches = !loading && filteredMessages.length === 0 && search.trim();

  return (
    <div className="chatwindow-container">
      <div className="chatwindow-header">
          {onBack && (
              <button onClick={onBack} className="back-btn">
                ←
              </button>
            )}
        <img className="chatwindow-avatar" src={selectedUser.profileImage} alt={selectedUser.username} />
        <div>
          <div className="chatwindow-username">{selectedUser.username}</div>
          <div className="chatwindow-role">{selectedUser.position || 'User'}</div>
        </div>
        <input
        className="chatwindow-search"
        type="text"
        placeholder="Search messages"
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search messages"
      />
      </div>
      {error ? <Alert severity="error" variant="outlined" className="panel-alert">{error}</Alert> : null}
      <div className="chatwindow-messages">
        {loading ? (
          <div className="panel-loading chat-loading">
            <CircularProgress size={26} />
          </div>
        ) : hasNoMatches ? (
          <div className="panel-empty">No messages match your search.</div>
        ) : (
          filteredMessages.map((m, i) => (
            <div
              key={i}
              className={`chatwindow-message ${m.fromUser === MY_USER_ID ? 'me' : 'other'}`}
            >
              {m.fromUser !== MY_USER_ID && (
                <img className="chatwindow-message-avatar" src={selectedUser.profileImage} alt="" />
              )}
              <div className="chatwindow-message-bubble">{m.message}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatwindow-input-row" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
        <input
          className="chatwindow-input"
          placeholder="Type a message"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          disabled={sending}
        />
        <button className="chatwindow-send-btn" type="submit" disabled={sending || !msg.trim()}>
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;