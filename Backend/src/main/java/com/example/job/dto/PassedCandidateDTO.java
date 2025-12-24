package com.example.job.dto;

public class PassedCandidateDTO {

    private Long applicationId;
    private String name;
    private String email;
    private int score;
    private String result;

    // getters & setters
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
}

