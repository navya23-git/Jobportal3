package com.example.job.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendShortlistMail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Job Application Result");
        message.setText("🎉 Congratulations! You have been shortlisted. We will contact you soon.");
        message.setFrom("your_email@gmail.com"); // Optional: same as spring.mail.from

        mailSender.send(message);
    }
}

