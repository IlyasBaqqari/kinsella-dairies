package com.kinselladairies.backend.models;

import jakarta.persistence.*;
import lombok.*;

// PAYMENT ENTITY
@Entity
@Table(name = "payments")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Payment {

    // PK - paymentID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID", nullable = false)
    private Long paymentID;

    // payment_type
    @Column(name = "payment_type", nullable = false, length = 4)
    private String paymentType;

    // card_details
    @Column(name = "card_details", length = 24)
    private String cardDetails;

}