package com.knowledgevault.service;

import com.knowledgevault.model.TechNote;
import com.knowledgevault.repository.TechNoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private TechNoteRepository techNoteRepository;

    public Map<String, Object> getSummary(String userId) {
        List<TechNote> notes = techNoteRepository.findByUserId(userId);

        long totalNotes = notes.size();
        long totalFavorites = notes.stream().filter(TechNote::isFavorite).count();
        long totalViews = notes.stream().mapToLong(TechNote::getAccessCount).sum();

        Map<String, Integer> topTags = new HashMap<>();
        for (TechNote note : notes) {
            if (note.getTags() != null) {
                for (String tag : note.getTags()) {
                    topTags.put(tag, topTags.getOrDefault(tag, 0) + 1);
                }
            }
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalNotes", totalNotes);
        summary.put("totalFavorites", totalFavorites);
        summary.put("totalViews", totalViews);
        summary.put("topTags", topTags);

        return summary;
    }
}
