package com.example.CarSharing.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

//    @Query("SELECT ur from Message where ur.sender=senderId and ur.receiver=receiverId") //trebuie sa te asiguri ca e bine creeat acest tabel
//    List<Message> findAllMessages(int receiverId, int senderId);
    @Query("SELECT msg FROM Message msg WHERE msg.sender = :senderId AND msg.receiver = :receiverId")
    List<Message> findAllMessages(@Param("receiverId") int receiverId, @Param("senderId") int senderId);

}
