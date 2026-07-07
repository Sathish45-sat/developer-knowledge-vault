package com.knowledgevault.service;

import com.knowledgevault.model.User;
import com.knowledgevault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserProfile(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User getUserProfileByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateUserProfile(String userId, User updateRequest) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            if (updateRequest.getBio() != null) user.setBio(updateRequest.getBio());
            if (updateRequest.getSkills() != null) user.setSkills(updateRequest.getSkills());
            if (updateRequest.getExperienceLevel() != null) user.setExperienceLevel(updateRequest.getExperienceLevel());
            if (updateRequest.getSocialLinks() != null) user.setSocialLinks(updateRequest.getSocialLinks());

            return userRepository.save(user);
        }

        return null;
    }
}
