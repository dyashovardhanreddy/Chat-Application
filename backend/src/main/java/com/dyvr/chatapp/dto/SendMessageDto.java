package com.dyvr.chatapp.dto;

import com.dyvr.chatapp.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMessageDto {

    private String receiver;

    private String message;
}
