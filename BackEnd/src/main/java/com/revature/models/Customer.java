package com.revature.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.List;

@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "customers")
public class Customer {

    //A model for our customers
    @Id
    @Column(name="customer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    //A bank should have your address info
    /*TODO: Maybe we should add another table with one to one relationship for the address or maybe customer_ info?
       includes everything below except the other foerign keys*/
    private String streetAddress;

    private String city;

    private String state;

    private String zip;

    //Phone number in case of fraud and verifying transfers to foreign royalty
    private String phone;

    //Each Customer has a default role as customer
    @ManyToOne
    @JoinColumn(name = "role_id_fk", referencedColumnName = "role_id", columnDefinition = "int DEFAULT 1")
    private Role role;

    //Customers can have multiple accounts
    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "customer")
    private List<Account> accounts;


    public Customer(String firstName, String lastName, String username,
                    String email, String password, String streetAddress,
                    String city, String state, String zip, String phone, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.role = role;
    }
}
