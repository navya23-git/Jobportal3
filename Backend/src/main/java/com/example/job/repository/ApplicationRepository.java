package com.example.job.repository;

import com.example.job.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Fetch all applications submitted by a specific student (by email)
    List<Application> findByEmail(String email);
    List<Application> findByJobIdAndStatus(Long jobId, String status);
 
}
