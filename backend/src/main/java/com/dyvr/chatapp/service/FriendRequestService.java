package com.dyvr.chatapp.service;

import com.dyvr.chatapp.model.FriendRequest;
import com.dyvr.chatapp.model.User;
import com.dyvr.chatapp.repository.FriendRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    public boolean checkFriendRequestExist(User sender, User receiver){
        System.out.println(sender.getUsername() + ":" + receiver.getUsername());
        System.out.println(friendRequestRepository.findBySenderAndReceiver(sender, receiver).orElse(null));
        return friendRequestRepository.findBySenderAndReceiver(sender, receiver).isPresent();
    }

    public boolean checkAlreadyFriends(User sender, User receiver){
        return sender.getFriends().contains(receiver);
    }

    public boolean isValidFriendRequest(User sender, User receiver){
        return !checkAlreadyFriends(sender, receiver) && !checkFriendRequestExist(sender, receiver);
    }

    public void createFriendRequest(User sender, User receiver){
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);

        friendRequestRepository.save(friendRequest);
    }

    public void deleteFriendRequest(User sender, User receiver){
        Long friendRequestId = friendRequestRepository.findBySenderAndReceiver(sender, receiver).orElse(null);

        if(friendRequestId != null){
            friendRequestRepository.deleteById(friendRequestId);
        }


    }
    public List<FriendRequest> getFriendRequests(User receiver){
        return friendRequestRepository.findRequestsByReceiverUsername(receiver);
    }
}
