import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Avatar, CircularProgress } from '@mui/material';
import { Home as HomeIcon, Business as BusinessIcon, Chat as ChatBubbleIcon, Mail as MailIcon, CalendarMonth as CalendarMonthIcon, Settings as SettingsIcon, Person as Person4Icon, HourglassBottom as HourglassBottomIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { getUserDetails } from '../../services/api';
import './Sidebar.css';


const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getUserDetails(5)
      .then(res => {
        if (isMounted) {
          setUser(res.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load account');
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
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <IconButton className="sidebar-icon">
          <HomeIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
          <BusinessIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
          <HourglassBottomIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
            <MailIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
            <DescriptionIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
          <CalendarMonthIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
        <Badge badgeContent={2} color="warning">
          <ChatBubbleIcon />
          </Badge>
        </IconButton>
        <IconButton className="sidebar-icon">
          <SettingsIcon />
        </IconButton>
        <IconButton className="sidebar-icon">
          <Person4Icon />
        </IconButton>
      </div>
      <div className="sidebar-account">
        {loading ? (
          <CircularProgress size={24} className="sidebar-loading" />
        ) : (
          <Avatar
            alt={user ? user.username : 'User'}
            src={user ? user.profileImage : ''}
            className="sidebar-avatar"
          />
        )}
        <span className="sidebar-label">{error || (user ? user.username : 'User')}</span>
      </div>
    </div>
  );
};

export default Sidebar;