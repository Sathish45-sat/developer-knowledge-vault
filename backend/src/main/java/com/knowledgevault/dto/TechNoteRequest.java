package com.knowledgevault.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TechNoteRequest {

    @NotEmpty(message = "Title is required")
    private String title;

    private String content;

    private String description;
    private String codeSnippet;
    private String imageUrl;
    private List<String> tags;
    private String category;
    private String difficulty;
}