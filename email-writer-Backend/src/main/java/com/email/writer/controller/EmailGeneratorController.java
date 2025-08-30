package com.email.writer.controller;


import com.email.writer.model.EmailRequest;
import com.email.writer.service.EmailGeneratorService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    
    private static EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) throws JsonProcessingException {
        String responce = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(responce);

    }

}
