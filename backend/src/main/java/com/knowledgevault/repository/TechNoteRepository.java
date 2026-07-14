package com.knowledgevault.repository;

import com.knowledgevault.model.TechNote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TechNoteRepository extends MongoRepository<TechNote, String> {
    List<TechNote> findByUserId(String userId);

    @Query("{ 'userId': ?0, '$text': { '$search': ?1 } }")
    List<TechNote> searchByTextAndUserId(String userId, String searchText);
}