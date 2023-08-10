package com.kinselladairies.backend.repositories;

import com.kinselladairies.backend.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAccountsRepository extends JpaRepository<Account, Long> {
    Account findByAccountID(Long accountID);
    Account findByNumber(String number);
    Boolean existsAccountByNumber(String number);
}
