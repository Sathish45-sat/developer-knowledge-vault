package com.knowledgevault.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Document(collection = "technotes")
public class TechNote {

    @Id
    private String id;

    @Indexed
    private String userId;

    @TextIndexed
    private String title;

    @TextIndexed
    private String content;

    private String description;
    private String codeSnippet;
    private String imageUrl;

    @Indexed
    private List<String> tags;

    private String category;
    private String difficulty;
    private boolean isFavorite;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date lastAccessed;

    private int accessCount = 0;
    private Set<String> visitedUserIds = new HashSet<>();

    // Getters
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getDescription() { return description; }
    public String getCodeSnippet() { return codeSnippet; }
    public String getImageUrl() { return imageUrl; }
    public List<String> getTags() { return tags; }
    public String getCategory() { return category; }
    public String getDifficulty() { return difficulty; }
    public boolean isFavorite() { return isFavorite; }
    public Date getCreatedAt() { return createdAt; }
    public Date getLastAccessed() { return lastAccessed; }
    public int getAccessCount() { return accessCount; }
    public Set<String> getVisitedUserIds() { return visitedUserIds; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setUserId(String userId) { this.userId = userId; }
    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
    public void setDescription(String description) { this.description = description; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public void setCategory(String category) { this.category = category; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setFavorite(boolean isFavorite) { this.isFavorite = isFavorite; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public void setLastAccessed(Date lastAccessed) { this.lastAccessed = lastAccessed; }
    public void setAccessCount(int accessCount) { this.accessCount = accessCount; }
    public void setVisitedUserIds(Set<String> visitedUserIds) { this.visitedUserIds = visitedUserIds; }
}
