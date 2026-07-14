package com.knowledgevault.controller;

import com.knowledgevault.dto.UserResponse;
import com.knowledgevault.model.User;
import com.knowledgevault.security.UserDetailsImpl;
import com.knowledgevault.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        User user = userService.getUserProfile(currentUser.getId());

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toUserResponse(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal UserDetailsImpl currentUser,
            @RequestBody User updateRequest) {

        User updatedUser = userService.updateUserProfile(currentUser.getId(), updateRequest);

        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toUserResponse(updatedUser));
    }

    private UserResponse toUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUserName(user.getUsername());
        response.setEmail(user.getEmail());
        response.setBio(user.getBio());
        response.setSkills(user.getSkills());
        response.setExperienceLevel(user.getExperienceLevel());
        response.setSocialLinks(user.getSocialLinks());
        return response;
    }
}