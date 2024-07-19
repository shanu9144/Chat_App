import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            gotConversation.message.push(newMessage._id);
        }
        await Promise.all([gotConversation.save(), newMessage.save()]);

        // Socket IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            newMessage
        });
    } catch (error) {
        console.error('Error in sendMessage:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        console.log(`Getting messages between ${senderId} and ${receiverId}`);
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("message");

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        console.log('Messages:', conversation.message);
        return res.status(200).json(conversation.message);
    } catch (error) {
        console.error('Error in getMessage:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
