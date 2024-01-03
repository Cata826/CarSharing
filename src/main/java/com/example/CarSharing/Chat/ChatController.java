package com.example.CarSharing.Chat;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {

    private final MessageService messageService;
    private final Server chatServer;

    public ChatController(MessageService messageService, Server chatServer) {
        this.messageService = messageService;
        this.chatServer = chatServer;
    }

    @PostMapping("/send")
    public String sendMessage(@RequestBody MessageDTO messageDTO) {
        Message message = new Message();
        message.setReceiver(messageDTO.getReceiver());
        message.setSender(messageDTO.getSender());
        message.setMessage(messageDTO.getMessage());
        message.setSendTime(java.time.LocalDateTime.now());

        messageService.saveMessage(message);

        chatServer.broadcast(messageDTO.getMessage());
        return "Message sent and saved";
    }

    @GetMapping("/messages/{receiverId}/{senderId}")
    public List<Message> getAllMessages(@PathVariable int receiverId, @PathVariable int senderId) {
        return messageService.getAllMessages(receiverId, senderId);
    }
}
