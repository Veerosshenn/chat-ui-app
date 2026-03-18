import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Avatar } from '@mui/material';
import { Home as HomeIcon, Business as BusinessIcon, Chat as ChatBubbleIcon, Mail as MailIcon, CalendarMonth as CalendarMonthIcon, Settings as SettingsIcon, Person as Person4Icon, HourglassBottom as HourglassBottomIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { getUserDetails } from '../../services/api';
import './Sidebar.css';


const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails(5).then(res => setUser(res.data));
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
      <Avatar
        alt={user ? user.username : "User"}
        src={user ? user.profileImage : ""}
        className="sidebar-avatar"
      />
      <p>{user ? user.username : "User"}</p>
    </div>
  );
};

export default Sidebar;