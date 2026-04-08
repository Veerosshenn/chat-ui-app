import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api.js';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, TextField, CircularProgress, Alert, ListItemButton } from '@mui/material';
import './UserList.css';

const MY_USER_ID = 5;

const UserList = ({ onSelect, selectedUserId }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        getUsers()
            .then((res) => {
                if (isMounted) {
                    setUsers(res.data);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError('Unable to load contacts');
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

    const filteredUsers = users
        .filter(u => u.id !== MY_USER_ID)
        .filter(u => (u.username || '').toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="userlist-container">
            <div className="panel-title-row">
                <div>
                    <div className="panel-eyebrow">Contacts</div>
                    <h3 className="panel-title">Chat people</h3>
                </div>
                <span className="panel-count">{filteredUsers.length}</span>
            </div>
            <TextField
                className="userlist-search"
                label="Search contact"
                fullWidth
                onChange={e => setFilter(e.target.value)}
                size="small"
            />
            {error ? (
                <Alert severity="error" variant="outlined" className="panel-alert">
                    {error}
                </Alert>
            ) : null}
            {loading ? (
                <div className="panel-loading">
                    <CircularProgress size={26} />
                </div>
            ) : (
                <List className="userlist-list">
                    {filteredUsers.map(user => (
                        <ListItem key={user.id} disablePadding className="userlist-item-wrapper">
                            <ListItemButton
                                className="userlist-item"
                                selected={selectedUserId === user.id}
                                onClick={() => onSelect(user)}
                            >
                                <ListItemAvatar>
                                    <Badge color="error" variant="dot" invisible={!user.unread}>
                                        <Avatar src={user.profileImage} alt={user.username} />
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={user.username}
                                    secondary={user.lastMessage || 'No recent messages'}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {!filteredUsers.length && (
                        <li className="panel-empty">No contacts match your search.</li>
                    )}
                </List>
            )}
        </div>
    );
};

export default UserList;    