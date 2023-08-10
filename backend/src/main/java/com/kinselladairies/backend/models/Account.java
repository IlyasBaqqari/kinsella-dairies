package com.kinselladairies.backend.models;

import jakarta.persistence.*;
import lombok.*;

// ACCOUNT ENTITY
@Entity
@Table(name = "accounts")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Account {

    // PK - accountID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accountID", nullable = false)
    private Long accountID;

    // first_name
    @Column(name = "first_name", nullable = false, length = 20)
    private String firstName;

    // last_name
    @Column(name = "last_name", nullable = false, length = 20)
    private String lastName;

    // number
    @Column(name = "number", nullable = false, length = 14)
    private String number;

    // address_1
    @Column(name = "address_1", nullable = false, length = 50)
    private String address1;

    // address_2
    @Column(name = "address_2", length = 50)
    private String address2;

    // town
    @Column(name = "town", nullable = false, length = 25)
    private String town;

    // postcode
    @Column(name = "postcode", nullable = false, length = 9)
    private String postcode;

    // password
    @Column(name = "password", nullable = false)
    private String password;

    // permission
    @Column(name = "role", nullable = false, length = 5)
    private String role;

}