package com.dyvr.chatapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendRequestDTO {
    private long id;

    private String senderFirstName;

    public FriendRequestDTO(long id, String senderFirstName){
        this.id = id;
        this.senderFirstName = senderFirstName;
    }
}
