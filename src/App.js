import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';
import Groups from './components/Groups/Groups';
import ChatWindow from './components/ChatWindow/ChatWindow';
import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState('contacts');

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
      {!isMobile && <Sidebar />}

      <div className="main-content">
        {isMobile ? (
          selectedUser && mobileSection === 'profile' ? (
            <div className="mobile-detail-shell">
              <div className="mobile-detail-header">
                <button
                  className="mobile-detail-back"
                  type="button"
                  onClick={() => setMobileSection('chat')}
                >
                  ← Back to chat
                </button>
                <button
                  className="mobile-detail-close"
                  type="button"
                  onClick={() => {
                    setMobileSection('contacts');
                    setSelectedUser(null);
                  }}
                >
                  Close
                </button>
              </div>
              <UserProfile user={selectedUser} />
            </div>
          ) : selectedUser ? (
            <div className="center-panel">
              <ChatWindow
                selectedUser={selectedUser}
                onBack={() => setSelectedUser(null)}
                onOpenProfile={() => setMobileSection('profile')}
              />
            </div>
          ) : (
            <div className="mobile-shell">
              <div className="mobile-shell-header">
                <div className="panel-eyebrow">Workspace</div>
                <h2>Messages</h2>
                <p>Choose between contacts and groups, then open a chat.</p>
              </div>
              <ButtonGroup className="mobile-switcher" variant="outlined" fullWidth>
                <Button
                  onClick={() => setMobileSection('contacts')}
                  variant={mobileSection === 'contacts' ? 'contained' : 'outlined'}
                >
                  Contacts
                </Button>
                <Button
                  onClick={() => setMobileSection('groups')}
                  variant={mobileSection === 'groups' ? 'contained' : 'outlined'}
                >
                  Groups
                </Button>
              </ButtonGroup>
              {mobileSection === 'groups' ? (
                <Groups compact />
              ) : (
                <UserList onSelect={setSelectedUser} selectedUserId={selectedUser?.id} compact />
              )}
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
