package com.knowledgevault.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider{
    // Using a securely generated 256-bit key for HMAC-SHA256
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    @Value("${app.jwtExpirationInMs:86400000}") // Default 1 day
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication){
        UserDetailsImpl userPrinicipal = (UserDetailsImpl) authentication.getPrincipal();

        Date now=new Date();
        Date expiryDate=new Date(now.getTime() + jwtExpirationInMs);
        return Jwts.builder()
                .setSubject(userPrinicipal.getId())
                .claim("email",userPrinicipal.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(getSigningKey()).compact();
    }
    //Extract Username From Token
    public String getUserIdFromJWT(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    //Check if token Expired
    public boolean validateToken(String authToken){
        try{
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        }catch (JwtException|IllegalArgumentException ex){
            System.err.println("Invalid JWT signature/token");

        }
        return false;
    }

}