package com.knowledgevault.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.knowledgevault.model.User;
import com.knowledgevault.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails{

    private String id;
    private String username;
    private String email;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(String id,String username,String email,String password){
        this.id=id;
        this.username=username;
        this.email=email;
        this.password=password;
    }

    public static UserDetailsImpl build(User user){
        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword());
    }



    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // typically we might use email for login, but we'll store username here
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }

    public String getId() {
        return id;
    }
}
