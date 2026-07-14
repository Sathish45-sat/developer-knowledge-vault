package com.knowledgevault.dto;

import com.knowledgevault.model.SocialLinks;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String userName;
    private String email;
    private String bio;
    private List<String> skills;
    private String experienceLevel;
    private SocialLinks socialLinks;
}
