package com.kinselladairies.backend.repositories;

import com.kinselladairies.backend.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaymentsRepository extends JpaRepository<Payment, Long> {
    Payment findByPaymentID(Long paymentID);

}
