package com.dyvr.chatapp.repository;

import com.dyvr.chatapp.model.ChatMessage;
import com.dyvr.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("select msg from ChatMessage msg where (msg.sender = :user1 AND msg.receiver = :user2) OR (msg.sender = :user2 AND msg.receiver = :user1)")
    public List<ChatMessage> getMessage(@Param("user1") User user1,@Param("user2") User user2);
}
