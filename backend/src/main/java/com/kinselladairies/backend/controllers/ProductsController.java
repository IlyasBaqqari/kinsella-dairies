package com.kinselladairies.backend.controllers;

import com.kinselladairies.backend.models.Product;
import com.kinselladairies.backend.repositories.IProductsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {

    @Autowired
    private IProductsRepository productsRepository;

    // CREATE - NEW PRODUCT
    @PostMapping(path = "/admin/products")
    public Product createProduct(@RequestParam("image") MultipartFile image,
                                @RequestParam("name") String name,
                                @RequestParam("price") Double price,
                                @RequestParam("stock") Integer stock) throws IOException {

        // Create new product instance
        Product newProduct = new Product();

        // Define image name, path, & file path
        String imageName = image.getOriginalFilename();
        String imagePath = "/productImages/" + imageName;
        String filePath = "../frontend/public" + imagePath;

        // If the file already exists, update the filename
        File fileCheck = new File(filePath);
        while (true) {
            if (fileCheck.exists() && !fileCheck.isDirectory()) {
                imageName = "new_" + imageName;
                imagePath = "/productImages/" + imageName;
                filePath = "../frontend/public" + imagePath;
                fileCheck = new File(filePath);
            } else break;
        }

        // Save product image
        byte[] bytes = image.getBytes();
        Path path = Paths.get(filePath);
        Files.write(path, bytes);

        // Populate product instance
        newProduct.setName(name);
        newProduct.setPrice(price);
        newProduct.setStock(stock);
        newProduct.setImageUrl(imagePath);

        // Save product to database
        productsRepository.save(newProduct);
        return productsRepository.save(newProduct);
    }

    // GET - ALL PRODUCTS
    @GetMapping(path = "/products")
    public List<Product> getProducts() {
        return productsRepository.findAll();
    }

    // GET - PRODUCT BY ID
    @GetMapping(path = "/products/{productID}")
    public Product getProductByID(@PathVariable Long productID) {
        return productsRepository.findByProductID(productID);
    }

    // UPDATE - PRODUCT BY ID
    @PutMapping(path = "/admin/products")
    public Product updateProduct(@RequestParam("image") MultipartFile image,
                                 @RequestParam("productID") Long productID,
                                 @RequestParam("name") String name,
                                 @RequestParam("price") Double price) throws IOException {

        // Create new product instance
        Product updatedProduct = new Product();

        // Define image name, path, & file path
        String imageName = image.getOriginalFilename();
        String imagePath = "/productImages/" + imageName;
        String filePath = "../frontend/public" + imagePath;

        // Delete original image
        Path oldPath = Paths.get("../frontend/public" + productsRepository.findByProductID(productID).getImageUrl());
        Files.delete(oldPath);

        // If the file already exists, update the filename
        File fileCheck = new File(filePath);
        while (true) {
            if (fileCheck.exists() && !fileCheck.isDirectory()) {
                imageName = "new_" + imageName;
                imagePath = "/productImages/" + imageName;
                filePath = "../frontend/public" + imagePath;
                fileCheck = new File(filePath);
            } else break;
        }

        // Save product image
        byte[] bytes = image.getBytes();
        Path newPath = Paths.get(filePath);
        Files.write(newPath, bytes);

        // Populate product instance
        updatedProduct.setName(name);
        updatedProduct.setPrice(price);
        updatedProduct.setImageUrl(imagePath);

        // Update product in database
        return productsRepository.findById(productID).map(product -> {
            if (updatedProduct.getName() != null)
                product.setName(updatedProduct.getName());
            if (updatedProduct.getPrice() != null)
                product.setPrice(updatedProduct.getPrice());
            if (updatedProduct.getImageUrl() != null)
                product.setImageUrl(updatedProduct.getImageUrl());
            return productsRepository.save(product);
        }).orElseThrow(() -> new EntityNotFoundException("No product found with ID " + productID));
    }

    // UPDATE - STOCK BY ID
    @PutMapping(path = "/admin/products/stock/{productID}")
    public Product updateStock(@PathVariable Long productID, @Validated @RequestBody Product updatedProduct) {
        return productsRepository.findById(productID).map(product -> {
            if (updatedProduct.getStock() != null)
                product.setStock(updatedProduct.getStock());
            return productsRepository.save(product);
        }).orElseThrow(() -> new EntityNotFoundException("Could not update stock level for product with ID " + productID));
    }

    // DELETE - PRODUCT BY ID
    @DeleteMapping(path="/admin/products/{productID}")
    public String deleteProduct(@PathVariable Long productID) throws IOException {

        // Delete original image
        Path imagePath = Paths.get("../frontend/public" + productsRepository.findByProductID(productID).getImageUrl());
        Files.delete(imagePath);

        // Delete product
        productsRepository.deleteById(productID);
        return "Product deleted";
    }

}
