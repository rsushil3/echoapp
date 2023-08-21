import Pusher from 'pusher'; // Import the Pusher library

// Pusher configuration
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

//Pusher Auth
export const authController = async (req, res) => {
  try {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authorizeChannel(socketId, channel);
    res.send(auth);

  } catch (error) {
    res.status(200).send({
      success: "false",
      message: "Error while Authorization Pusher",
      error: error.message,
    });
  }
};

//Pusher Messages Api
export const messagesController = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const { sender, content } = req.body;
  // Trigger an event on the Pusher channel
    await pusher.trigger(`private-${chatId}`, 'client-receive-message', {
    sender,
    content
    });

  } catch (error) {
    res.status(200).send({
      success: "false",
      message: "Error while Authorization Pusher",
      error: error.message,
    });
  }
};
