package com.knowledgevault.controller;

import com.knowledgevault.security.UserDetailsImpl;
import com.knowledgevault.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        return ResponseEntity.ok(analyticsService.getSummary(currentUser.getId()));
    }
}
