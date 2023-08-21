import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import Pusher from 'pusher'; // Import the Pusher library
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const PORT = process.env.PORT || 8000;

// ESmodule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'https://echoapp.cyclic.cloud'
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, './client/build')))

//rest api
app.use("*", function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// Pusher configuration
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authorizeChannel(socketId, channel);
  res.send(auth);
});

app.post('/messages/:chatId', (req, res) => {
  const chatId = req.params.chatId;
  const { sender, content } = req.body;
  // Trigger an event on the Pusher channel
  pusher.trigger(`private-${chatId}`, 'client-receive-message', {
    sender,
    content
  });
});


app.use("/api/auth", authRoutes);

connectDB().then(server.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
}));
