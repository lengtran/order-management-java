package com.oms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private String name;
    private int qty;
    private double listPrice;
    private double retailPrice;

    public Long getId()            { return id; }
    public String getOrderId()     { return orderId; }
    public String getName()        { return name; }
    public int getQty()            { return qty; }
    public double getListPrice()   { return listPrice; }
    public double getRetailPrice() { return retailPrice; }
}
