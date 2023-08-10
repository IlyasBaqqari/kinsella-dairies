package com.kinselladairies.backend.models;

import jakarta.persistence.*;
import lombok.*;

// PRODUCT ENTITY
@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {

    // PK - productID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productID", nullable = false)
    private Long productID;

    // name
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    // image_URL
    @Lob
    @Column(name = "image_url")
    private String imageUrl;

    // stock
    @Column(name = "stock", nullable = false)
    private Integer stock;

    // price
    @Column(name = "price", nullable = false, columnDefinition = "DECIMAL(5, 2) UNSIGNED")
    private Double price;

}