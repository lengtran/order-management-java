package com.oms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String phoneType;
    private String street;
    private String city;
    private String state;
    private String zip;
    private String accountType;
    private String contactPref;

    public String getId()          { return id; }
    public String getFirstName()   { return firstName; }
    public String getLastName()    { return lastName; }
    public String getEmail()       { return email; }
    public String getPhone()       { return phone; }
    public String getPhoneType()   { return phoneType; }
    public String getStreet()      { return street; }
    public String getCity()        { return city; }
    public String getState()       { return state; }
    public String getZip()         { return zip; }
    public String getAccountType() { return accountType; }
    public String getContactPref() { return contactPref; }
}
