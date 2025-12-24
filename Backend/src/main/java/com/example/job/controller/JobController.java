package com.example.job.controller;

import com.example.job.entity.Job;
import com.example.job.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Recruiter posts a new job
    @PostMapping("/post")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Job> postJob(@RequestBody Job job) {
        String recruiterUsername = SecurityContextHolder.getContext()
                                     .getAuthentication()
                                     .getName();
        Job savedJob = jobService.postJob1(job, recruiterUsername);
        return ResponseEntity.ok(savedJob);
    }



    // Get all jobs (for recruiter/admin)
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    // Get only active jobs (for applicants)
    @GetMapping("/active")
    public ResponseEntity<List<Job>> getActiveJobs() {
        List<Job> activeJobs = jobService.getActiveJobs();
        return ResponseEntity.ok(activeJobs);
    }
    @GetMapping("/my")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<Job> getMyJobs() {
        String recruiter = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return jobService.getJobsByRecruiter(recruiter);
    }

}


