import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';
import Groups from './components/Groups/Groups';
import ChatWindow from './components/ChatWindow/ChatWindow';
import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 720px)');

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="app-root">
      <Sidebar />

      <div className="main-content">
        {isMobile ? (
          selectedUser ? (
            <div className="center-panel">
              <ChatWindow 
                selectedUser={selectedUser} 
                onBack={() => setSelectedUser(null)}
              />
            </div>
          ) : (
            <div className="left-panel mobile-stack">
              <UserList onSelect={setSelectedUser} selectedUserId={selectedUser?.id} />
              <Groups />
            </div>
          )
        ) : (
          <>
            <div className="left-panel">
              <UserList onSelect={setSelectedUser} selectedUserId={selectedUser?.id} />
              <Groups />
            </div>

            <div className="center-panel">
              {selectedUser ? (
                <ChatWindow selectedUser={selectedUser} />
              ) : (
                <div className="placeholder-card">
                  <div className="placeholder-eyebrow">Messages</div>
                  <h2>Choose a conversation</h2>
                  <p>Select a contact from the list to open their chat thread.</p>
                </div>
              )}
            </div>

            <div className="right-panel">
              {selectedUser ? <UserProfile user={selectedUser} /> : <div className="placeholder-card compact">Pick a contact to see profile details.</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
