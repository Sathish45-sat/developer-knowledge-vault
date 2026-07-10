package com.knowledgevault.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.knowledgevault.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
}