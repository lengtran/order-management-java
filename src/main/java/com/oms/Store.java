package com.oms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "stores")
public class Store {
    @Id
    private String id;
    private String name;
    private String city;
    private String state;

    // Getters and Setters
    public String getId()    { return id; }
    public String getName()  { return name; }
    public String getCity()  { return city; }
    public String getState() { return state; }
}
