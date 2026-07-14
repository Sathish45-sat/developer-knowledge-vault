package com.knowledgevault.repository;

import com.knowledgevault.model.TechNoteVersion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TechNoteVersionRepository extends MongoRepository<TechNoteVersion, String> {
    List<TechNoteVersion> findByTechNoteIdOrderByUpdatedAtDesc(String techNoteId);
}
