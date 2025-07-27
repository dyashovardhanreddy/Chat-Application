package com.dyvr.chatapp.service;

import com.dyvr.chatapp.model.ChatMessage;
import com.dyvr.chatapp.model.User;
import com.dyvr.chatapp.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public void createMessage(ChatMessage chatMessage){

        chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessages(User user1, User user2){
        return chatMessageRepository.getMessage(user1, user2);
    }
}
