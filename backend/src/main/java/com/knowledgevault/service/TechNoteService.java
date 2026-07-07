package com.knowledgevault.service;

import com.knowledgevault.model.TechNote;
import com.knowledgevault.model.TechNoteVersion;
import com.knowledgevault.repository.TechNoteRepository;
import com.knowledgevault.repository.TechNoteVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TechNoteService {

    @Autowired
    private TechNoteRepository techNoteRepository;

    @Autowired
    private TechNoteVersionRepository versionRepository;

    public Page<TechNote> getTechNotes(String userId, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        return techNoteRepository.findByUserId(userId, pageable);
    }

    public List<TechNote> getAllTechNotes() {
        return techNoteRepository.findAll();
    }

    public List<TechNote> getMyTechNotes(String userId) {
        return techNoteRepository.findByUserId(userId);
    }

    public List<TechNote> searchTechNotes(String userId, String searchText) {
        return techNoteRepository.searchByTextAndUserId(userId, searchText);
    }

    public List<TechNote> getFavorites(String userId) {
        return techNoteRepository.findByUserIdAndIsFavoriteTrue(userId);
    }

    public TechNote createTechNote(String userId, TechNote techNote) {
        techNote.setUserId(userId);
        techNote.setCreatedAt(new Date());
        techNote.setLastAccessed(new Date());
        return techNoteRepository.save(techNote);
    }

    public TechNote getTechNoteById(String id, String userId) {
        TechNote techNote = techNoteRepository.findById(id).orElse(null);
        if (techNote != null) {
            techNote.setAccessCount(techNote.getAccessCount() + 1);
            techNote.setLastAccessed(new Date());
            return techNoteRepository.save(techNote); // update access stats
        }
        return null;
    }

    public TechNote updateTechNote(String id, String userId, TechNote updateRequest) {
        TechNote existing = techNoteRepository.findById(id).orElse(null);
        
        if (existing != null && existing.getUserId().equals(userId)) {
            boolean isContentChanged = updateRequest.getContent() != null && !updateRequest.getContent().equals(existing.getContent());
            boolean isDescChanged = updateRequest.getDescription() != null && !updateRequest.getDescription().equals(existing.getDescription());
            boolean isCodeChanged = updateRequest.getCodeSnippet() != null && !updateRequest.getCodeSnippet().equals(existing.getCodeSnippet());

            if (isContentChanged || isDescChanged || isCodeChanged) {
                String prevContent = "Description: " + (existing.getDescription() != null ? existing.getDescription() : "") + 
                                     " | CodeSnippet: " + (existing.getCodeSnippet() != null ? existing.getCodeSnippet() : "") + 
                                     " | Content: " + (existing.getContent() != null ? existing.getContent() : "");
                TechNoteVersion version = new TechNoteVersion(existing.getId(), prevContent);
                versionRepository.save(version);
            }

            if (updateRequest.getContent() != null) existing.setContent(updateRequest.getContent());
            if (updateRequest.getTitle() != null) existing.setTitle(updateRequest.getTitle());
            if (updateRequest.getTags() != null) existing.setTags(updateRequest.getTags());
            if (updateRequest.getCategory() != null) existing.setCategory(updateRequest.getCategory());
            if (updateRequest.getDifficulty() != null) existing.setDifficulty(updateRequest.getDifficulty());
            if (updateRequest.getDescription() != null) existing.setDescription(updateRequest.getDescription());
            if (updateRequest.getCodeSnippet() != null) existing.setCodeSnippet(updateRequest.getCodeSnippet());
            if (updateRequest.getImageUrl() != null) existing.setImageUrl(updateRequest.getImageUrl());
            existing.setFavorite(updateRequest.isFavorite());

            return techNoteRepository.save(existing);
        }
        return null;
    }

    public boolean deleteTechNote(String id, String userId) {
        TechNote existing = techNoteRepository.findById(id).orElse(null);
        if (existing != null && existing.getUserId().equals(userId)) {
            techNoteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<TechNoteVersion> getTechNoteVersions(String techNoteId, String userId) {
        TechNote existing = techNoteRepository.findById(techNoteId).orElse(null);
        if (existing != null && existing.getUserId().equals(userId)) {
            return versionRepository.findByTechNoteIdOrderByUpdatedAtDesc(techNoteId);
        }
        return null;
    }
}
