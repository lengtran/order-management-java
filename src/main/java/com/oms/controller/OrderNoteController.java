package com.oms.controller;

import com.oms.model.OrderNote;
import com.oms.repository.OrderNoteRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/order-notes")
public class OrderNoteController {

    private final OrderNoteRepository repo;
    public OrderNoteController(OrderNoteRepository repo) { this.repo = repo; }

    @GetMapping("/{orderId}")
    public List<OrderNote> getByOrderId(@PathVariable String orderId) {
        return repo.findByOrderIdOrderByCreatedAtDesc(orderId);
    }
}