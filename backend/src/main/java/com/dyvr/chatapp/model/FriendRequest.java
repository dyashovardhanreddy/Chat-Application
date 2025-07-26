package com.dyvr.chatapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonIgnore
    @ManyToOne
    private User sender;

    @JsonIgnore
    @ManyToOne
    private User receiver;


    private LocalDateTime requestedAt = LocalDateTime.now();
}
