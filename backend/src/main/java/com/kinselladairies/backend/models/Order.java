package com.kinselladairies.backend.models;

import jakarta.persistence.*;
import lombok.*;

// ORDER ENTITY
@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Order {

    // PK - orderID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderID", nullable = false)
    private Long orderID;

    // order_details
    @Lob
    @Column(name = "order_details", nullable = false, length=99999)
    private String orderDetails;

    // total
    @Column(name = "total", nullable = false, columnDefinition = "DECIMAL(10, 2) UNSIGNED")
    private Double total;

    // date
    @Column(name = "date", nullable = false, length = 8)
    private String date;

    // FK - accountID
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accountID", nullable = false, referencedColumnName = "accountID")
    private Account accountID;

    // FK - paymentID
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paymentID", nullable = false, referencedColumnName = "paymentID")
    private Payment paymentID;

}