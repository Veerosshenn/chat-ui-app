import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api.js';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, TextField } from '@mui/material';
import './UserList.css';

const UserList = ({ onSelect }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        getUsers().then(res => setUsers(res.data));
    }, []);

    return (
        <div className="userlist-container">
        <TextField
        className="userlist-search"
        label="Search Contact"        
        fullWidth 
        onChange={e => setFilter(e.target.value)}
        />
        <List className="userlist-list">
            {users
                .filter(u => u.id !== 5)
                .filter(u => u.id >= 1 && u.id <= 4)
                .filter(u => (u.username || '').toLowerCase().includes(filter.toLowerCase()))
                .map(user => (
                    <ListItem button key={user.id} onClick={() => onSelect(user)}>
                        <ListItemAvatar>
                            <Badge color="error" variant="dot" invisible={!user.unread}>
                                <Avatar src={user.profileImage} />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText 
                        primary={user.username}
                        secondary={user.lastMessage} />
                    </ListItem>
            ))}
        </List>
        </div>
    );
};

export default UserList;    