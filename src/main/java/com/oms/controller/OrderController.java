package com.oms.controller;

import com.oms.repository.OrderRepository;
import com.oms.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // GET all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // GET single order by ID
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable String id) {
        return orderRepository.findById(id).orElse(null);
    }

    // PUT update an order
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order updated) {
        updated.setId(id);
        return orderRepository.save(updated);
    }
}
