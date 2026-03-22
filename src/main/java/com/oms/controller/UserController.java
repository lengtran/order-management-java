package com.oms.controller;

import com.oms.model.User;
import com.oms.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;
    public UserController(UserRepository repo) { this.repo = repo; }

    @GetMapping
    public List<User> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable String id) {
        return repo.findById(id);
    }

    // 👇 ADD THIS new endpoint
    @GetMapping("/current")
    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return repo.findByUsername(username).orElse(null);
    }
}