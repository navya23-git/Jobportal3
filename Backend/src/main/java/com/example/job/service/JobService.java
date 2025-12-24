package com.example.job.service;

import com.example.job.entity.Job;
import com.example.job.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

//    public Job postJob(Job job, String name) {
//        job.setPostedAt(LocalDateTime.now());
//        job.setExpiresAt(LocalDateTime.now().plusDays(2)); // default 2 days expiration
//        return jobRepository.save(job);
//    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getActiveJobs() {
        return jobRepository.findByExpiresAtAfter(LocalDateTime.now());
    }
    public Job postJob1(Job job, String recruiterUsername) {
        job.setPostedBy(recruiterUsername);
        job.setPostedAt(LocalDateTime.now());

        if (job.getExpiresAt() == null) {
            job.setExpiresAt(LocalDateTime.now().plusDays(2));
        }

        return jobRepository.save(job);
    }

	public List<Job> getJobsByRecruiter(String recruiter) {
		// TODO Auto-generated method stub
		 return jobRepository.findByPostedBy(recruiter);
	}

}



