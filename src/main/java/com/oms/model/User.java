package com.oms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String storeId;
    private boolean active;

    public String getId()        { return id; }
    public String getUsername()  { return username; }
    public String getFirstName() { return firstName; }
    public String getLastName()  { return lastName; }
    public String getEmail()     { return email; }
    public String getRole()      { return role; }
    public String getStoreId()   { return storeId; }
    public boolean isActive()    { return active; }
}