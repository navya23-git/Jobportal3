package com.example.job.service;

import com.example.job.entity.AptitudeTestResult;
import com.example.job.repository.AptitudeTestRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AptitudeService {

    @Autowired
    private AptitudeTestRepository repository;

    public AptitudeTestResult submitTest(String studentEmail, Long applicationId, int score) {
        AptitudeTestResult result = new AptitudeTestResult();
        result.setApplicationId(applicationId);
        result.setStudentEmail(studentEmail);
        result.setScore(score);
        result.setResult(score >= 10 ? "PASSED" : "FAILED"); // Example pass/fail

        return repository.save(result);
    }
    public List<AptitudeTestResult> getPassedCandidatesForJob(Long applicationId) {
        return repository.findByApplicationIdAndResult(applicationId, "PASSED");
    }
}
