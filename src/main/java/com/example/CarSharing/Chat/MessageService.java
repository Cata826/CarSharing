package com.example.CarSharing.Chat;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
        List<Message> sentMessages = messageRepository.findAllMessages(receiverId,senderID);
        List<Message> receivedMessages = messageRepository.findAllMessages(senderID,receiverId);
        List<Message> allMessages = new ArrayList<>(sentMessages);
        allMessages.addAll(receivedMessages);
        Collections.sort(allMessages, new Comparator<Message>() {
            @Override
            public int compare(Message m1, Message m2) {
                return m1.getSendTime().compareTo(m2.getSendTime());
            }
        });
        return allMessages;
    }



}
