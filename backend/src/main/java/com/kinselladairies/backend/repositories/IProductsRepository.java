package com.kinselladairies.backend.repositories;

import com.kinselladairies.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductsRepository extends JpaRepository<Product, Long> {
    Product findByProductID(Long productID);
}
