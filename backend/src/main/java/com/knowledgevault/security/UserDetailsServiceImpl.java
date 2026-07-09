package com.knowledgevault.security;

import com.knowledgevault.model.User;
import com.knowledgevault.repository.UserRepository;
import com.knowledgevault.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new UsernameNotFoundException("USer not found with email: "+email);
        }
        return UserDetailsImpl.build(user);
    }
}