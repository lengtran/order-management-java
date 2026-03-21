package com.oms.controller;

import com.oms.model.Store;
import com.oms.repository.StoreRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stores")
public class StoreController {
    private final StoreRepository repo;
    public StoreController(StoreRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Store> getAll() { return repo.findAll(); }
}
