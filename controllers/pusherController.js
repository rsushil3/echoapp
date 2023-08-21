import Pusher from 'pusher'; // Import the Pusher library

// Pusher configuration
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

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
