package com.kinselladairies.backend.repositories;

import com.kinselladairies.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface IOrdersRepository extends JpaRepository<Order, Long> {
    Order findByAccountID_AccountID(Long accountID);
    Boolean existsOrderByAccountID_AccountID(Long accountID);
     @Transactional
     @Modifying
     @Query("delete from Order o where o.accountID.accountID = ?1")
     void deleteByAccountID_AccountID(Long accountID);
}
