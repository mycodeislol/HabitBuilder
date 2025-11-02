package com.example.habitbuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/test")
public class HabitbuilderApplication {

    public static void main(String[] args) {
        SpringApplication.run(HabitbuilderApplication.class, args);
    }

    @GetMapping
    public Map<String, String> testApi() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Backend is running successfully!");
        response.put("status", "ok");
        return response;
    }
}
