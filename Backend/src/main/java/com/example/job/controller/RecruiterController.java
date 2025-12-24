package com.example.job.controller;

import java.util.List;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job.dto.PassedCandidateDTO;


import com.example.job.service.ApplicationService;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(origins = "http://localhost:5173")
public class RecruiterController {

    private final ApplicationService service;

    public RecruiterController(ApplicationService service) {
        this.service = service;
    }
    @GetMapping("/jobs/{jobId}/passed")
    public List<PassedCandidateDTO> getPassedCandidates(@PathVariable Long jobId) {
        return service.getPassedCandidatesForJob(jobId);
    }


}


