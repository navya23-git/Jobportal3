package com.example.job.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job.entity.Application;
import com.example.job.repository.ApplicationRepository;
import com.example.job.service.EmailService;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:5173")
public class EmailController {

    private final EmailService emailService;
    private final ApplicationRepository applicationRepository;

    public EmailController(EmailService emailService,
                           ApplicationRepository applicationRepository) {
        this.emailService = emailService;
        this.applicationRepository = applicationRepository;
    }

    // Send email to shortlisted student
    @PostMapping("/send/{applicationId}")
    public ResponseEntity<String> sendShortlistEmail(
            @PathVariable Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        emailService.sendShortlistMail(application.getEmail());

        return ResponseEntity.ok("Email sent successfully");
    }
}
