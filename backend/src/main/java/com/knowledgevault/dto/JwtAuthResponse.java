package com.knowledgevault.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JwtAuthResponse{

    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthResponse(String token) {
        this.accessToken=token;
    }
}