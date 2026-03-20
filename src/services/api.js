import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const getUsers = () => axios.get(`${BASE_URL}/users/list`);

export const getGroups = () => axios.get(`${BASE_URL}/groups/list`);

export const getChatList = () => axios.get(`${BASE_URL}/chat/list`);

export const getChatbyUserID = (id) => axios.get(`${BASE_URL}/chatByUserId/${id}`);

export const addChat = (chat) => axios.post(`${BASE_URL}/chat/add`, chat);

export const getUserDetails = (id) => axios.get(`${BASE_URL}/user/${id}`);