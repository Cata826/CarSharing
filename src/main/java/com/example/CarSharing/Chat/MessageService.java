package com.example.CarSharing.Chat;

import org.springframework.stereotype.Service;

import java.util.List;

// ... other imports ...

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void saveMessage(Message message) {
        messageRepository.save(message);
    }

    public List<Message> getAllMessages(int receiverId, int senderID) {
        return messageRepository.findAllMessages(receiverId, senderID);
    }
}
