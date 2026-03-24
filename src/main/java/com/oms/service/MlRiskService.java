package com.oms.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

@Service
public class MlRiskService {

    // RestTemplate is Spring's built-in HTTP client
    // Like fetch() in JavaScript or requests in Python
    private final RestTemplate restTemplate = new RestTemplate();

    // URL of your FastAPI ML service
    private static final String ML_API_URL = "http://127.0.0.1:8081/predict";

    public String getRiskScore(double total, String orderStatus, String paymentStatus) {

        // Build the request body (matches FastAPI's OrderRequest model)
        Map<String, Object> requestBody = Map.of(
                "total", total,
                "order_status", orderStatus,
                "payment_status", paymentStatus
        );

        // Set headers - tell FastAPI we're sending JSON
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Wrap body + headers into an HttpEntity (like a request envelope)
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // Send POST request to FastAPI and get response back as a Map
        ResponseEntity<Map> response = restTemplate.postForEntity(ML_API_URL, request, Map.class);

        // Extract and return just the risk_score value
        return (String) response.getBody().get("risk_score");
    }
}
