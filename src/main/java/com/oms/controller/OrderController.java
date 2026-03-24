package com.oms.controller;

import com.oms.repository.OrderRepository;
import com.oms.model.Order;
import com.oms.service.MlRiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MlRiskService mlRiskService;

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

    // GET ML risk score for a single order
    @GetMapping("/{id}/risk")
    public ResponseEntity<Map<String, String>> getOrderRisk(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        String riskScore = mlRiskService.getRiskScore(
                order.getTotal(),
                order.getOrderStatus(),
                order.getPaymentStatus()
        );

        return ResponseEntity.ok(Map.of(
                "orderId", id,
                "riskScore", riskScore
        ));
    }
}