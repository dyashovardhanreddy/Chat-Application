package com.dyvr.chatapp.controller;

import com.dyvr.chatapp.dto.SendFriendRequestDto;
import com.dyvr.chatapp.model.FriendRequest;
import com.dyvr.chatapp.model.User;
import com.dyvr.chatapp.repository.FriendRequestRepository;
import com.dyvr.chatapp.repository.UserRepository;
import com.dyvr.chatapp.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/chat-app")
public class FriendController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendRequestService friendRequestService;

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @PostMapping("/sendFriendRequest")
    public ResponseEntity<?> sendFriendRequest(@RequestBody SendFriendRequestDto friendRequestDto){

        String senderUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User sender = userRepository.findByUsername(senderUsername).orElse(null);

        User receiver = userRepository.findByUsername(friendRequestDto.getReceiverUsername()).orElse(null);

        if(sender == null || receiver == null || sender == receiver){
            return ResponseEntity.badRequest().body("Invalid Users");
        }


        if(friendRequestService.checkFriendRequestExist(sender, receiver)){
            return ResponseEntity.badRequest().body("Friend Request Already Exists");
        }

        if(friendRequestService.checkAlreadyFriends(sender, receiver)){
            return ResponseEntity.badRequest().body("Users are already friends");
        }

        friendRequestService.createFriendRequest(sender, receiver);

        return ResponseEntity.status(HttpStatus.OK).body("Friend Request Sent");
    }

    @PostMapping("/acceptFriendRequest/{friendRequestId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable Long friendRequestId){

        FriendRequest friendRequest = friendRequestRepository.getReferenceById(friendRequestId);

        // Validate is friend request exists
        if(friendRequest == null){
            return ResponseEntity.badRequest().body("Invalid Request");
        }

        String user = SecurityContextHolder.getContext().getAuthentication().getName();

        // Validate if authenticated user is receiver of friend request
        if(!user.equals(friendRequest.getReceiver().getUsername())){
            return ResponseEntity.badRequest().body("Invalid Request");
        }

        User sender = friendRequest.getSender();
        User receiver = friendRequest.getReceiver();

        sender.getFriends().add(receiver);
        receiver.getFriends().add(sender);

        friendRequestRepository.deleteById(friendRequestId);
        // Delete friend request sent by receiver to sender if exists
        friendRequestService.deleteFriendRequest(receiver, sender);

        return ResponseEntity.status(HttpStatus.OK).body("Friend Request Accepted");
    }


    @GetMapping("/getFriendRequests")
    public ResponseEntity<?> getFriendRequests(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        List<FriendRequest> friendRequests = friendRequestService.getFriendRequests(user);

        return ResponseEntity.status(HttpStatus.OK).body(friendRequests);
    }

    @GetMapping("/getFriends")
    public ResponseEntity<?> getFriends(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        List<User> users = user.getFriends().stream().toList();

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
}
