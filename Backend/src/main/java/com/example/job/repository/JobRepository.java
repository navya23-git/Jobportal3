package com.example.job.repository;

import com.example.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    List<Job> findByExpiresAtAfter(LocalDateTime now);
    List<Job> findByPostedBy(String postedBy);
}
