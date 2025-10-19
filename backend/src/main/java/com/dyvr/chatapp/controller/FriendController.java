package com.dyvr.chatapp.controller;

import com.dyvr.chatapp.dto.FriendRequestDTO;
import com.dyvr.chatapp.dto.UserDto;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> sendFriendRequest(@RequestBody UserDto userDto){

        String senderUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User sender = userRepository.findByUsername(senderUsername).orElse(null);

        User receiver = userRepository.findByUsername(userDto.getUser()).orElse(null);

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

    @PostMapping("/rejectFriendRequest/{friendRequestId}")
    public ResponseEntity<?> rejectFriendRequest(@PathVariable long friendRequestId){

        FriendRequest friendRequest = friendRequestRepository.getReferenceById(friendRequestId);

        if(friendRequest == null){
            return ResponseEntity.badRequest().body("Invalid Request, friend request does not exist");
        }

        String user = SecurityContextHolder.getContext().getAuthentication().getName();

        if(!friendRequest.getReceiver().getUsername().equals(user)){
            return ResponseEntity.badRequest().body("Invalid Request, user can't perform action on this request");
        }

        friendRequestRepository.deleteById(friendRequestId);

        return ResponseEntity.status(HttpStatus.OK).body("Friend Request Rejected");
    }

    @GetMapping("/getFriendRequests")
    public ResponseEntity<?> getFriendRequests(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        List<FriendRequestDTO> friendRequests = friendRequestService.getFriendRequests(user).stream()
                .map(friendRequest -> new FriendRequestDTO(friendRequest.getId(), friendRequest.getSender().getFirstname())).toList();

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

    @GetMapping("/findFriends")
    public ResponseEntity<?> findFriends(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        Set<User> friends = user.getFriends();
        if(friends == null)
            friends = new HashSet<>();
        Set<User> users = new HashSet<>(userRepository.findAll());

        // Remove users who are already friends

        for(User friend: friends){
            users.remove(friend);
        }
        users.remove(user);

        // Remove users from whom friend requests already exists
        List<FriendRequest> friendRequests = friendRequestService.getFriendRequests(user);
        for(FriendRequest friendRequest: friendRequests){
            users.remove(friendRequest.getSender());
        }


        return ResponseEntity.status(HttpStatus.OK).body(users.stream().toList());
    }
}
