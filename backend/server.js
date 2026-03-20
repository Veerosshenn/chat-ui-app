import express from "express";
import cors from "cors";
import fs from "fs";

// load mock data
const data = JSON.parse(fs.readFileSync("./mockData.json", "utf-8"));

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

/**
 * USERS
 */
app.get("/users/list", (req, res) => {
  res.json(data.users);
});

/**
 * GROUPS
 */
app.get("/groups/list", (req, res) => {
  res.json(data.groups);
});

/**
 * USER DETAILS
 */
app.get("/user/:id", (req, res) => {
  const user = data.userDetails[req.params.id];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

/**
 * CHAT BY USER ID
 */
app.get("/chatByUserId/:id", (req, res) => {
  res.json(data.chats[req.params.id] || []);
});

/**
 * ADD CHAT
 */
app.post("/chat/add", (req, res) => {
  const { toUser, fromUser, message } = req.body;

  if (!toUser || !fromUser || !message) {
    return res.status(400).json({ error: "Invalid chat payload" });
  }

  // create chat array if not exist
  if (!data.chats[toUser]) {
    data.chats[toUser] = [];
  }

  const newMessage = {
    fromUser,
    toUser,
    message
  };

  data.chats[toUser].push(newMessage);

  res.json({ success: true, data: newMessage });
});

/**
 * HEALTH CHECK (optional)
 */
app.get("/", (req, res) => {
  res.send("Mock API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});