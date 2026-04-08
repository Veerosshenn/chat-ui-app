import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../services/api.js';
import { CircularProgress, Alert } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MessageIcon from '@mui/icons-material/Message';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    if (user && user.id) {
      let isMounted = true;

      getUserDetails(user.id)
        .then((res) => {
          if (isMounted) {
            setUserDetails(res.data);
          }
        })
        .catch(() => {
          if (isMounted) {
            setError('Unable to load profile');
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

    setUserDetails(null);
    setLoading(false);
    return undefined;
  }, [user]);

  if (loading) {
    return (
      <div className="userprofile-container">
        <div className="panel-loading">
          <CircularProgress size={26} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="userprofile-container">
        <Alert severity="error" variant="outlined" className="panel-alert">
          {error}
        </Alert>
      </div>
    );
  }

  if (!userDetails) {
    return <div className="userprofile-container">Select a user to view details</div>;
  }

  return (
    <div className="userprofile-container">
      <div className="userprofile-header">
        <img className="userprofile-avatar" src={userDetails.profileImage} alt={userDetails.username} />
        </div>
        <div className="userprofile-header-info">
          <div className="userprofile-name">{userDetails.username}</div>
          <div className="userprofile-role">{userDetails.position || 'UI / UX Designer'}</div>
          <div className="userprofile-location">
            <span role="img" aria-label="location">📍</span> {userDetails.address || 'San Francisco, California'}
        </div>
      </div>
      <div className="userprofile-actions">
        <button className="userprofile-action-btn" title="Profile">
          <PersonAddAltIcon />
        </button>
        <button className="userprofile-action-btn" title="Message">
          <MessageIcon />
        </button>
        <button className="userprofile-action-btn" title="VideoChat">
          <VideoChatIcon />
        </button>
      </div>
      <div className="userprofile-section">
        <div className="userprofile-section-title">User Information</div>
        <div className="userprofile-info-row">
          <span className="userprofile-info-label">Phone:</span>
          <span>{userDetails.phone || '+01-222-345678'}</span>
        </div>
        <div className="userprofile-info-row">
          <span className="userprofile-info-label">Email:</span>
          <span>{userDetails.email || 'Kevin_aztechnologies@gmail.com'}</span>
        </div>
      </div>
      <div className="userprofile-section">
        <div className="userprofile-section-title">Group Participants</div>
        <div className="userprofile-group">
          <span className="userprofile-group-name">Marketing</span>
          <span className="userprofile-group-more">+2</span>
        </div>
      </div>
      <div className="userprofile-section">
        <div className="userprofile-section-title">Media</div>
        <div className="userprofile-media-list">
          <img className="userprofile-media-img" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=100&q=80" alt="media1" />
          <img className="userprofile-media-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=100&q=80" alt="media2" />
          <img className="userprofile-media-img" src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=100&q=80" alt="media3" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;