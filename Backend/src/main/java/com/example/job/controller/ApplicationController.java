package com.example.job.controller;

import com.example.job.entity.Application;
import com.example.job.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository; // ✅ Field injection

    private static final String UPLOAD_DIR =
            System.getProperty("user.dir") + "/uploads/";

    // ======================================================
    // APPLY FOR JOB (STUDENT ONLY)
    // ======================================================
    @PostMapping(value = "/apply")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> applyJob(
            Authentication authentication,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String message,
            @RequestParam Long jobId,
            @RequestParam MultipartFile resume
    ) {
        try {
            if (resume == null || resume.isEmpty()) {
                return ResponseEntity.badRequest().body("Resume is required");
            }

            if (!isValidFileType(resume.getContentType())) {
                return ResponseEntity.badRequest()
                        .body("Only PDF or Word documents are allowed");
            }

            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName = System.currentTimeMillis() + "_" +
                    Paths.get(resume.getOriginalFilename())
                            .getFileName().toString();

            Path filePath = Paths.get(UPLOAD_DIR, fileName);

            Files.copy(resume.getInputStream(), filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            Application application = new Application();
            application.setName(name);
            application.setEmail(authentication.getName()); // JWT email
            application.setPhone(phone);
            application.setMessage(message);
            application.setJobId(jobId);
            application.setResumePath(filePath.toString());
            application.setStatus("PENDING");

            // ✅ SAVE & CAPTURE
            Application savedApplication =
                    applicationRepository.save(application);

            // ✅ RETURN applicationId (THIS FIXES EVERYTHING)
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(
                            java.util.Map.of(
                                    "applicationId",
                                    savedApplication.getId()
                            )
                    );

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload resume");
        }
    }


    // ======================================================
    // GET STUDENT'S OWN APPLICATIONS (STUDENT ONLY)
    // ======================================================
    @GetMapping("/my-applications")
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<List<Application>> getMyApplications(
            Authentication authentication
    ) {
        String studentEmail = authentication.getName();
        List<Application> applications =
                applicationRepository.findByEmail(studentEmail);

        return ResponseEntity.ok(applications);
    }

    // ======================================================
    // FILE TYPE VALIDATION
    // ======================================================
    private boolean isValidFileType(String contentType) {
        return contentType != null && (
                contentType.equals("application/pdf") ||
                contentType.equals("application/msword") ||
                contentType.equals(
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        );
    }
}


