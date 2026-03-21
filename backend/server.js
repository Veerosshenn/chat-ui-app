import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ORIGINAL API BASE
const OLD_API = process.env.OLD_API_URL;

/**
 * USERS
 */
app.get("/api/chatSystem/users/list", async (req, res) => {
  try {
    const response = await axios.get(`${OLD_API}/users/list`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * GROUPS
 */
app.get("/api/chatSystem/groups/list", async (req, res) => {
  try {
    const response = await axios.get(`${OLD_API}/groups/list`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

/**
 * USER DETAILS
 */
app.get("/api/chatSystem/user/:id", async (req, res) => {
  try {
    const response = await axios.get(`${OLD_API}/user/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

/**
 * CHAT LIST
 */
app.get("/api/chatSystem/chat/list", async (req, res) => {
  try {
    const response = await axios.get(`${OLD_API}/chat/list`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat list" });
  }
});

/**
 * CHAT BY USER ID
 */
app.get("/api/chatSystem/chatByUserId/:id", async (req, res) => {
  try {
    const response = await axios.get(`${OLD_API}/chatByUserId/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

/**
 * ADD CHAT
 */
app.post("/api/chatSystem/chat/add", async (req, res) => {
  try {
    const response = await axios.post(`${OLD_API}/chat/add`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

/**
 * HEALTH CHECK
 */
app.get("/", (req, res) => {
  res.send("Proxy server running successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});