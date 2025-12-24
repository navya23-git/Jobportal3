package com.example.job.controller;

import com.example.job.entity.AptitudeTestResult;
import com.example.job.repository.AptitudeTestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aptitude")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AptitudeTestController {

    @Autowired
    private AptitudeTestRepository aptitudeRepository;

    public static class AptitudeTestRequest {
        public Long applicationId;
        public int score;
    }

    @PostMapping("/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> submitTest(
            Authentication authentication,
            @RequestBody AptitudeTestRequest request
    ) {
        String studentEmail = authentication.getName(); // from JWT

        AptitudeTestResult test = new AptitudeTestResult();
        test.setApplicationId(request.applicationId);
        test.setScore(request.score);

        // Determine pass/fail (example: 50% as passing)
        test.setResult(request.score >= 10 ? "PASSED" : "FAILED");
        test.setStudentEmail(studentEmail);

        aptitudeRepository.save(test);

        return ResponseEntity.ok("Test submitted successfully!");
    }
}


