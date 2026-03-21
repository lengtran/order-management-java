package com.oms.controller;

import com.oms.model.Customer;
import com.oms.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository repo;
    public CustomerController(CustomerRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Customer> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable String id) {
        return repo.findById(id);
    }
}