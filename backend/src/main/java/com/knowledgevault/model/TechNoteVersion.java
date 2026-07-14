package com.knowledgevault.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "technote_versions")
public class TechNoteVersion {

    @Id
    private String id;

    private String techNoteId;
    private String previousContent;

    @CreatedDate
    private Date updatedAt;

    public TechNoteVersion() {}

    public TechNoteVersion(String techNoteId, String previousContent) {
        this.techNoteId = techNoteId;
        this.previousContent = previousContent;
        this.updatedAt = new Date();
    }

    public String getId() { return id; }
    public String getTechNoteId() { return techNoteId; }
    public String getPreviousContent() { return previousContent; }
    public Date getUpdatedAt() { return updatedAt; }

    public void setId(String id) { this.id = id; }
    public void setTechNoteId(String techNoteId) { this.techNoteId = techNoteId; }
    public void setPreviousContent(String previousContent) { this.previousContent = previousContent; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}
