package com.knowledgevault.controller;

import com.knowledgevault.dto.TechNoteRequest;
import com.knowledgevault.model.TechNote;
import com.knowledgevault.security.UserDetailsImpl;
import com.knowledgevault.service.TechNoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technotes")
public class TechNoteController {

    @Autowired
    private TechNoteService techNoteService;

    @PostMapping
    public ResponseEntity<TechNote> createNote(
            @AuthenticationPrincipal UserDetailsImpl currentUser,
            @Valid @RequestBody TechNoteRequest request) {
        TechNote note = techNoteService.createNote(currentUser.getId(), request);
        return ResponseEntity.ok(note);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TechNote>> searchNotes(
            @AuthenticationPrincipal UserDetailsImpl currentUser,
            @RequestParam String q) {
        return ResponseEntity.ok(techNoteService.searchNotes(currentUser.getId(), q));
    }

    @GetMapping
    public ResponseEntity<List<TechNote>> getMyNotes(
            @AuthenticationPrincipal UserDetailsImpl currentUser) {
        return ResponseEntity.ok(techNoteService.getNotesForUser(currentUser.getId()));
    }

    // Alias added so the existing frontend's getMyTechNotes() call (GET /api/technotes/me) works,
    // without needing to touch the frontend. Same data as GET /api/technotes above.
    @GetMapping("/me")
    public ResponseEntity<List<TechNote>> getMyTechNotes(
            @AuthenticationPrincipal UserDetailsImpl currentUser) {
        return ResponseEntity.ok(techNoteService.getNotesForUser(currentUser.getId()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TechNote>> getAllNotes() {
        return ResponseEntity.ok(techNoteService.getAllNotes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechNote> getNote(
            @AuthenticationPrincipal UserDetailsImpl currentUser,
            @PathVariable String id) {
        return ResponseEntity.ok(techNoteService.getNoteById(currentUser.getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechNote> updateNote(
            @AuthenticationPrincipal UserDetailsImpl currentUser,
            @PathVariable String id,
            @Valid @RequestBody TechNoteRequest request) {
        return ResponseEntity.ok(techNoteService.updateNote(currentUser.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(
            @AuthenticationPrincipal UserDetailsImpl currentUser,
            @PathVariable String id) {
        techNoteService.deleteNote(currentUser.getId(), id);
        return ResponseEntity.noContent().build();
    }
}