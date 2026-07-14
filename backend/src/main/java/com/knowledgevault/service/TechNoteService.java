package com.knowledgevault.service;

import com.knowledgevault.dto.TechNoteRequest;
import com.knowledgevault.model.TechNote;
import com.knowledgevault.model.TechNoteVersion;
import com.knowledgevault.repository.TechNoteRepository;
import com.knowledgevault.repository.TechNoteVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechNoteService {

    @Autowired
    private TechNoteRepository techNoteRepository;

    @Autowired
    private TechNoteVersionRepository techNoteVersionRepository;

    public TechNote createNote(String userId, TechNoteRequest request) {
        TechNote note = new TechNote();
        note.setUserId(userId);
        note.setTitle(request.getTitle());
        // Fallback to description if content is null/empty to preserve search indexing
        note.setContent(request.getContent() != null && !request.getContent().isEmpty() 
                ? request.getContent() : request.getDescription());
        note.setDescription(request.getDescription());
        note.setCodeSnippet(request.getCodeSnippet());
        note.setImageUrl(request.getImageUrl());
        note.setTags(request.getTags());
        note.setCategory(request.getCategory());
        note.setDifficulty(request.getDifficulty());
        return techNoteRepository.save(note);
    }

    public List<TechNote> getNotesForUser(String userId) {
        return techNoteRepository.findByUserId(userId);
    }

    public List<TechNote> getAllNotes() {
        return techNoteRepository.findAll();
    }

    public TechNote getNoteById(String userId, String noteId) {
        TechNote note = techNoteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        // Ownership check
        if (!note.getUserId().equals(userId)) {
            throw new RuntimeException("You do not have access to this note");
        }

        // Increment access/revisit count and save
        note.setAccessCount(note.getAccessCount() + 1);
        return techNoteRepository.save(note);
    }

    public List<TechNote> searchNotes(String userId, String query) {
        return techNoteRepository.searchByTextAndUserId(userId, query);
    }

    public TechNote updateNote(String userId, String noteId, TechNoteRequest request) {
        TechNote note = getNoteById(userId, noteId); // retrieves note and increments accessCount

        String newContent = request.getContent() != null && !request.getContent().isEmpty() 
                ? request.getContent() : request.getDescription();

        boolean isContentChanged = !newContent.equals(note.getContent() != null ? note.getContent() : "");
        boolean isDescChanged = request.getDescription() != null && !request.getDescription().equals(note.getDescription() != null ? note.getDescription() : "");
        boolean isCodeChanged = request.getCodeSnippet() != null && !request.getCodeSnippet().equals(note.getCodeSnippet() != null ? note.getCodeSnippet() : "");

        if (isContentChanged || isDescChanged || isCodeChanged) {
            String prevContent = "Description: " + (note.getDescription() != null ? note.getDescription() : "") + 
                                 " | CodeSnippet: " + (note.getCodeSnippet() != null ? note.getCodeSnippet() : "") + 
                                 " | Content: " + (note.getContent() != null ? note.getContent() : "");
            techNoteVersionRepository.save(new TechNoteVersion(note.getId(), prevContent));
        }

        note.setTitle(request.getTitle());
        note.setContent(newContent);
        note.setDescription(request.getDescription());
        note.setCodeSnippet(request.getCodeSnippet());
        note.setImageUrl(request.getImageUrl());
        note.setTags(request.getTags());
        note.setCategory(request.getCategory());
        note.setDifficulty(request.getDifficulty());

        return techNoteRepository.save(note);
    }

    public void deleteNote(String userId, String noteId) {
        TechNote note = getNoteById(userId, noteId);
        techNoteRepository.delete(note);
    }
}