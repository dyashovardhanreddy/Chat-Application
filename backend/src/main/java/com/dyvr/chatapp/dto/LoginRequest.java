package com.dyvr.chatapp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class LoginRequest {

    private String username;

    private String password;
}
