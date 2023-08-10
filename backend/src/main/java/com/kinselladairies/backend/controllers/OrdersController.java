package com.kinselladairies.backend.controllers;

import com.kinselladairies.backend.models.Order;
import com.kinselladairies.backend.repositories.IOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
public class OrdersController {

    @Autowired
    private IOrdersRepository ordersRepository;

    // CREATE - ORDER
    @PostMapping(path="/orders")
    public Order makeOrder(@RequestBody Order newOrder) {
        return ordersRepository.save(newOrder);
    }

    // GET - ORDER BY ACCOUNT ID
    @GetMapping(path="/orders/{accountID}")
    public Order getOrder(@PathVariable Long accountID) {
        return ordersRepository.findByAccountID_AccountID(accountID);
    }

    // DELETE - ORDER
    @DeleteMapping(path="/orders/{orderID}")
    public String deleteOrder(@PathVariable Long orderID) {
        ordersRepository.deleteById(orderID);
        return "Order deleted";
    }
}
