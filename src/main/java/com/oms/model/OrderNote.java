package com.oms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_notes")
public class OrderNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderId;
    private String userId;
    private String noteType;
    private String noteText;
    private LocalDateTime createdAt;

    public Long getId()                  { return id; }
    public String getOrderId()           { return orderId; }
    public String getUserId()            { return userId; }
    public String getNoteType()          { return noteType; }
    public String getNoteText()          { return noteText; }
    public LocalDateTime getCreatedAt()  { return createdAt; }
}
