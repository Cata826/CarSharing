package com.example.CarSharing.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    //metoda de getAllMessages(receiver id, sender id)
    @Query("Select u from chat_table where u.sender=senderId and u.receiver=receiverId") //trebuie sa te asiguri ca e bine creeat acest tabel
    List<Message> findAllMessages(int receiverId, int senderId);
}
