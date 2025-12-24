//package com.example.job.service;
//
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.example.job.dto.PassedCandidateDTO;
//import com.example.job.entity.Application;
//import com.example.job.entity.AptitudeTestResult;
//import com.example.job.repository.ApplicationRepository;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//
//@Service
//public class ApplicationService {
//
//    private final ApplicationRepository repository;
//
//    // Change this path to wherever you want to save resumes
//    private final String uploadDir = "C:/resumes/";
//
//    public ApplicationService(ApplicationRepository repository) {
//        this.repository = repository;
//    }
//
//    public Application saveApplication(String fullName, String email, String phone, String message, Long jobId, MultipartFile resume) throws IOException {
//
//        // Make sure upload directory exists
//        File dir = new File(uploadDir);
//        if (!dir.exists()) dir.mkdirs();
//
//        // Save resume file
//        String filePath = uploadDir + System.currentTimeMillis() + "_" + resume.getOriginalFilename();
//        resume.transferTo(new File(filePath));
//
//        // Save application to DB
//        Application app = new Application();
//        app.setName(fullName);
//        app.setEmail(email);
//        app.setMessage(message);
//        app.setJobId(jobId);
//        app.setResumePath(filePath);
//
//        return repository.save(app);
//    }
//    public List<Application> getShortlistedCandidates(Long jobId) {
//        return repository.findByJobIdAndStatus(jobId, "SHORTLISTED");
//    }
package com.example.job.service;

import com.example.job.dto.PassedCandidateDTO;
import com.example.job.entity.Application;
import com.example.job.entity.AptitudeTestResult;
import com.example.job.repository.ApplicationRepository;
import com.example.job.repository.AptitudeTestRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final AptitudeTestRepository aptitudeRepository;

    // Change this path if needed
    private final String uploadDir = "C:/resumes/";

    public ApplicationService(ApplicationRepository applicationRepository,
                              AptitudeTestRepository aptitudeRepository) {
        this.applicationRepository = applicationRepository;
        this.aptitudeRepository = aptitudeRepository;
    }

    // ============================
    // SAVE JOB APPLICATION
    // ============================
    public Application saveApplication(
            String fullName,
            String email,
            String phone,
            String message,
            Long jobId,
            MultipartFile resume
    ) throws IOException {

        // Ensure directory exists
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Save resume file
        String filePath = uploadDir + System.currentTimeMillis()
                + "_" + resume.getOriginalFilename();
        resume.transferTo(new File(filePath));

        // Save application
        Application app = new Application();
        app.setName(fullName);
        app.setEmail(email);
        app.setPhone(phone);
        app.setMessage(message);
        app.setJobId(jobId);
        app.setResumePath(filePath);
        app.setStatus("APPLIED"); // default status

        return applicationRepository.save(app);
    }

    // ============================
    // GET PASSED CANDIDATES FOR JOB
    // ============================
    public List<PassedCandidateDTO> getPassedCandidatesForJob(Long jobId) {

        // 1. Fetch PASSED applications
        List<Application> applications =
                applicationRepository.findByJobIdAndStatus(jobId, "PASSED");

        List<PassedCandidateDTO> result = new ArrayList<>();

        for (Application app : applications) {

            // 2. Fetch PASSED aptitude test
            List<AptitudeTestResult> tests =
                    aptitudeRepository.findByApplicationIdAndResult(
                            app.getId(), "PASSED");

            if (tests.isEmpty()) {
                continue;
            }

            AptitudeTestResult test = tests.get(0);

            // 3. Build DTO
            PassedCandidateDTO dto = new PassedCandidateDTO();
            dto.setApplicationId(app.getId());
            dto.setName(app.getName());
            dto.setEmail(app.getEmail());
            dto.setScore(test.getScore());
            dto.setResult(test.getResult());

            result.add(dto);
        }

        return result;
    }
}

   

	
    


