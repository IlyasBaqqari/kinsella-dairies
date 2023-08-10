package com.kinselladairies.backend.controllers;

import com.kinselladairies.backend.models.Payment;
import com.kinselladairies.backend.repositories.IPaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentsController {

    @Autowired
    private IPaymentsRepository paymentsRepository;

    // CREATE - PAYMENT
    @PostMapping(path="/payments", consumes={"application/json"})
    public Payment createPayment(@Validated @RequestBody Payment newPayment) {
        paymentsRepository.save(newPayment);
        return paymentsRepository.save(newPayment);
    }

    // GET - PAYMENT BY ID
    @GetMapping(path="/payments/{paymentID}")
    public Payment getPaymentByID(@PathVariable Long paymentID) {
        return paymentsRepository.findByPaymentID(paymentID);
    }
}
