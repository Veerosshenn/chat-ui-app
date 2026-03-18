import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';
import Groups from './components/Groups/Groups';
import ChatWindow from './components/ChatWindow/ChatWindow';
import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-content">
        <div className="left-panel">
          <UserList onSelect={setSelectedUser} />
          <Groups />
        </div>
        <div className="center-panel">
          {selectedUser ? (
            <ChatWindow selectedUser={selectedUser} />
          ) : (
            <div className="placeholder">Select a user to start chatting</div>
          )}
        </div>
        <div className="right-panel">
          {selectedUser && <UserProfile user={selectedUser} />}
        </div>
      </div>
    </div>
  );
}

export default App;
