package com.example.job.repository;

import com.example.job.entity.AptitudeTestResult;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AptitudeTestRepository extends JpaRepository<AptitudeTestResult, Long> {
	// Find all results with "PASSED" for a specific application/job
    List<AptitudeTestResult> findByApplicationIdAndResult(Long applicationId, String result);

    // Optional: find all passed results for a job (if multiple applications per job)
    List<AptitudeTestResult> findByApplicationIdInAndResult(List<Long> applicationIds, String result);
}
