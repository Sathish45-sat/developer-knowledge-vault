package com.knowledgevault.controller;

import com.knowledgevault.dto.JwtAuthResponse;
import com.knowledgevault.dto.LoginRequest;
import com.knowledgevault.dto.RegisterRequest;
import com.knowledgevault.dto.UserResponse;
import com.knowledgevault.model.User;
import com.knowledgevault.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/auth")
public class AuthController{
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        User registeredUser = authService.register(user);
        UserResponse userResponse=new UserResponse();
        userResponse.setEmail(registeredUser.getEmail());
        userResponse.setUsername(registeredUser.getUsername());
        userResponse.setId(registeredUser.getId());
        return ResponseEntity.ok(userResponse);

    }
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginRequest request){
        String token = authService.login(request.getEmail(),request.getPassword());
        return ResponseEntity.ok(new JwtAuthResponse(token));
    }

}
