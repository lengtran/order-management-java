package com.oms.controller;

import com.oms.model.OrderItem;
import com.oms.repository.OrderItemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    private final OrderItemRepository repo;
    public OrderItemController(OrderItemRepository repo) { this.repo = repo; }

    @GetMapping("/{orderId}")
    public List<OrderItem> getByOrderId(@PathVariable String orderId) {
        return repo.findByOrderId(orderId);
    }
}
