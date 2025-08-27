package com.email.writer.service;


import com.email.writer.model.EmailRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    @Value("${gemini_url}")
    private String GeminiUrl;

    @Value("${gemini_key}")
    private String GeminiKey;


    public String generateEmailReply(EmailRequest emailRequest) throws JsonProcessingException {

        //building prompt;
        String prompt = buildPrompt(emailRequest);

        //craft question;
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        //send request and receive responce;

        String responce = webClient.post()
                .uri(GeminiUrl+GeminiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        return extractResponceText(responce);
    }

    private String extractResponceText(String responce) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootnode = objectMapper.readTree(responce);

        return rootnode.path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text")
                .asText();
    }

    private String buildPrompt(EmailRequest emailRequest) {

        StringBuilder prompt = new StringBuilder();
        prompt.append("Rewrite the following email into a professional, concise, and humanized response in 20–200 words, " +
                "Do not add 'subject' line or any just straight reply ");
        if(emailRequest.getTone()!=null && !emailRequest.getTone().isEmpty()){
            prompt.append("use a ").append(emailRequest.getTone()).append(" tone");
        }
        prompt.append("\n Original Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }

}
