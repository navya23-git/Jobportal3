package com.example.job.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "aptitude_test_results")
public class AptitudeTestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long applicationId;

    @Column(nullable = false)
    private String studentEmail;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private String result; // PASSED / FAILED

    public AptitudeTestResult() {}

    // Getters and Setters
    public Long getId() { return id; }

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
}

