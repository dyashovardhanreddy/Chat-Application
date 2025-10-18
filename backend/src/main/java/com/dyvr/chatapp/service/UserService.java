package com.dyvr.chatapp.service;

import com.dyvr.chatapp.dto.LoginRequest;
import com.dyvr.chatapp.dto.SignUpRequest;
import com.dyvr.chatapp.model.User;
import com.dyvr.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(SignUpRequest userDetails){

        if(userRepository.existsByUsername(userDetails.getUsername())){
            throw new IllegalArgumentException("Username already exists");
        }

        if(!userDetails.getPassword().equals(userDetails.getConfirmPassword())){
            throw new IllegalArgumentException("Password and confirm password do not match.");
        }

        User user = new User();
        user.setEmail(userDetails.getEmail());
        user.setUsername(userDetails.getUsername());
        user.setFirstname(userDetails.getFirstname());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));

        userRepository.save(user);

    }

    public User loginUser(LoginRequest loginDetails){
        User user = userRepository.findByUsername(loginDetails.getUsername()).orElse(null);
        if(user == null || !(user.getPassword().equals(loginDetails.getPassword()))){
            throw new IllegalArgumentException("Invalid credentials");
        }
        return user;
    }
}
