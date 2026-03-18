import React, { useState, useEffect } from 'react';
import { getGroups, getUsers } from '../../services/api';
import './Groups.css';

const groupColors = ['#a5b4fc', '#fcd34d', '#fca5a5', '#6ee7b7', '#fde68a'];

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getGroups().then(res => setGroups(res.data));
        getUsers().then(res => setUsers(res.data));
    }, []);

    const getGroupUsers = (userIds) => {
        return users.filter(u => userIds.includes(u.id));
    };

    return (
        <div className="groups-container">
            <div className="groups-header">
                <span className="groups-title">Groups ({groups.length})</span>
                <button className="groups-add-btn">+</button>
            </div>
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
            </ul>
        </div>
    );
};

export default Groups;