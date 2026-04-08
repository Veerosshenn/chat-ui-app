import React, { useState, useEffect } from 'react';
import { getGroups, getUsers } from '../../services/api';
import { CircularProgress, Alert } from '@mui/material';
import './Groups.css';

const groupColors = ['#a5b4fc', '#fcd34d', '#fca5a5', '#6ee7b7', '#fde68a'];

const Groups = ({ compact = false }) => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        Promise.all([getGroups(), getUsers()])
            .then(([groupsResponse, usersResponse]) => {
                if (!isMounted) {
                    return;
                }

                setGroups(groupsResponse.data);
                setUsers(usersResponse.data);
            })
            .catch(() => {
                if (isMounted) {
                    setError('Unable to load groups');
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

    const getGroupUsers = (userIds) => {
        return users.filter(u => userIds.includes(u.id));
    };

    return (
        <div className={`groups-container ${compact ? 'compact' : ''}`}>
            <div className="groups-header">
                <div>
                    <div className="panel-eyebrow">Team spaces</div>
                    <span className="groups-title">Groups ({groups.length})</span>
                </div>
                <button className="groups-add-btn">+</button>
            </div>
            {error ? <Alert severity="error" variant="outlined" className="panel-alert">{error}</Alert> : null}
            {loading ? (
                <div className="panel-loading">
                    <CircularProgress size={26} />
                </div>
            ) : (
                <ul className="groups-list">
                    {groups.map((group, idx) => {
                        const groupUsers = getGroupUsers(group.users || []);
                        return (
                            <li className="groups-list-item" key={group.id}>
                                <span
                                    className="groups-badge"
                                    style={{ background: groupColors[idx % groupColors.length] }}
                                >
                                    {group.name[0]}
                                </span>
                                <span className="groups-list-name" title={group.name}>{group.name}</span>
                                <div className="groups-participants">
                                    {groupUsers[0] && (
                                        <img
                                            className="groups-participant-avatar"
                                            src={groupUsers[0].profileImage}
                                            alt={groupUsers[0].username}
                                        />
                                    )}
                                    {groupUsers.length > 1 && (
                                        <span className="groups-participant-more">
                                            +{groupUsers.length - 1}
                                        </span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                    {!groups.length && <li className="panel-empty">No groups available yet.</li>}
                </ul>
            )}
        </div>
    );
};

export default Groups;