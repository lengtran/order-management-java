package com.oms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;
    private String customerId;
    private String customer;
    private String storeId;
    private String orderStatus;
    private String paymentStatus;
    private String fulfillment;
    private String date;
    private double total;
    private String createdBy;

    public String getCreatedBy()                 { return createdBy; }
    public String getId()                        { return id; }
    public void setId(String id)                 { this.id = id; }
    public String getCustomerId()                { return customerId; }
    public void setCustomerId(String v)          { this.customerId = v; }
    public String getCustomer()                  { return customer; }
    public void setCustomer(String v)            { this.customer = v; }
    public String getStoreId()                   { return storeId; }
    public void setStoreId(String v)             { this.storeId = v; }
    public String getOrderStatus()               { return orderStatus; }
    public void setOrderStatus(String v)         { this.orderStatus = v; }
    public String getPaymentStatus()             { return paymentStatus; }
    public void setPaymentStatus(String v)       { this.paymentStatus = v; }
    public String getFulfillment()               { return fulfillment; }
    public void setFulfillment(String v)         { this.fulfillment = v; }
    public String getDate()                      { return date; }
    public void setDate(String v)                { this.date = v; }
    public double getTotal()                     { return total; }
    public void setTotal(double v)               { this.total = v; }
}
