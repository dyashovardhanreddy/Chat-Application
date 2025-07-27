package com.dyvr.chatapp.controller;

import com.dyvr.chatapp.dto.SendMessageDto;
import com.dyvr.chatapp.dto.UserDto;
import com.dyvr.chatapp.model.ChatMessage;
import com.dyvr.chatapp.model.User;
import com.dyvr.chatapp.repository.UserRepository;
import com.dyvr.chatapp.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/chat-app")
public class MessageController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatMessageService chatMessageService;

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestBody SendMessageDto sendMessageDto){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        Set<User> friends = user.getFriends();
        User receiver = userRepository.findByUsername(sendMessageDto.getReceiver()).orElse(null);
        if(friends == null || ! friends.contains(receiver)){
            return ResponseEntity.badRequest().body("You can only send message to friend");
        }

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessage(sendMessageDto.getMessage());
        chatMessage.setReceiver(receiver);
        chatMessage.setSender(user);

        chatMessageService.createMessage(chatMessage);

        return ResponseEntity.status(HttpStatus.OK).body("Message Sent");
    }

    @GetMapping("/getMessages")
    public ResponseEntity<?> getMessages(@RequestBody UserDto userDto,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user1 = userRepository.findByUsername(username).orElse(null);
        Set<User> friends = user1.getFriends();
        User user2 = userRepository.findByUsername(userDto.getUser()).orElse(null);

        if(friends == null || ! friends.contains(user2)){
            return ResponseEntity.badRequest().body("You are not friend with User");
        }

        Page<ChatMessage> messages = chatMessageService.getMessages(user1, user2, page, size);

        return ResponseEntity.status(HttpStatus.OK).body(messages);
    }
}
