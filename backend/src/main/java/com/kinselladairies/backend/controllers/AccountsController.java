package com.kinselladairies.backend.controllers;

import com.kinselladairies.backend.models.Account;
import com.kinselladairies.backend.repositories.IAccountsRepository;
import com.kinselladairies.backend.repositories.IOrdersRepository;
import com.kinselladairies.backend.repositories.IPaymentsRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AccountsController {

    @Autowired
    private IAccountsRepository accountsRepository;
    @Autowired
    private IOrdersRepository ordersRepository;
    @Autowired
    private IPaymentsRepository paymentsRepository;

    // CREATE - ACCOUNT
    @PostMapping(path="/accounts", consumes = {"application/json"})
    public Account createAccount(@Validated @RequestBody Account newAccount) {

        // Create the account if it does not already exist
        if (accountsRepository.existsAccountByNumber(newAccount.getNumber()))
            throw new EntityExistsException("The phone number you entered is already being used by someone else.\n\nPlease enter a different phone number, or Log in if you already have an account.");

        // Save account to database
        accountsRepository.save(newAccount);
        newAccount.setPassword("hidden");
        return newAccount;
    }

    // GET - ACCOUNT BY ID
    @GetMapping(path="/accounts/{accountID}")
    public Account getAccountByID(@PathVariable Long accountID) {
        // Retrieve the account
        Account account = accountsRepository.findByAccountID(accountID);
        // Hide the password
        account.setPassword("hidden");
        return account;
    }

    // UPDATE - ACCOUNT BY ID
    @PutMapping(path="/accounts/{accountID}")
    public Account updateAccount(@PathVariable Long accountID, @Validated @RequestBody Account updateRequest) {
        // Update requested fields if account exists
        return accountsRepository.findById(accountID).map(account -> {
            if (updateRequest.getFirstName() != null)
                account.setFirstName(updateRequest.getFirstName());
            if (updateRequest.getLastName() != null)
                account.setLastName(updateRequest.getLastName());
            if (updateRequest.getNumber() != null)
                account.setNumber(updateRequest.getNumber());
            if (updateRequest.getAddress1() != null)
                account.setAddress1(updateRequest.getAddress1());
            if (updateRequest.getAddress2() != null)
                account.setAddress2(updateRequest.getAddress2());
            if (updateRequest.getTown() != null)
                account.setTown(updateRequest.getTown());
            if (updateRequest.getPostcode() != null)
                account.setPostcode(updateRequest.getPostcode());
            if (updateRequest.getRole() != null)
                account.setRole(updateRequest.getRole());
            return accountsRepository.save(account);
        }).orElseThrow(() -> new EntityNotFoundException("An error occured and your account information could not be found. Please try again."));
    }

    // UPDATE - PASSWORD BY ID
    @PutMapping(path="/accounts/pass/{accountID}")
    public String updatePassword(@PathVariable Long accountID,
                                 @RequestParam("oldPassword") String oldPassword,
                                 @RequestParam("newPassword") String newPassword) throws Exception {
        // Check existence
        if (!(accountsRepository.existsById(accountID)))
            throw new EntityNotFoundException("An error occured and your account information could not be found. Please try again.");

        // Get account details
        Account account = accountsRepository.findByAccountID(accountID);

        // Verify old password is correct
        if (!(account.getPassword().equals(oldPassword)))
            throw new Exception("The password you entered was incorrect.\n\nPlease enter your current password, and try again.");

        // Verify new password is different
        if (newPassword.equals(oldPassword))
            throw new Exception("The new password you entered is the same as your current password.\n\nPlease enter a different password and try again.");

        // Set new password
        account.setPassword(newPassword);
        accountsRepository.save(account);
        return "Password updated";
    }

    // DELETE - ACCOUNT BY ID
    @DeleteMapping(path="/accounts/{accountID}")
    public String deleteAccount(@PathVariable Long accountID) {
        // Check account exists
        if (!accountsRepository.existsById(accountID))
            throw new EntityNotFoundException("An error occured and your account information could not be found. Please try again.");
        // Delete any associated orders & payments
        else if (ordersRepository.existsOrderByAccountID_AccountID(accountID)) {
            Long paymentID = ordersRepository.findByAccountID_AccountID(accountID).getPaymentID().getPaymentID();
            ordersRepository.deleteByAccountID_AccountID(accountID);
            paymentsRepository.deleteById(paymentID);
        }
        accountsRepository.deleteById(accountID);
        return "Account deleted";
    }

    // LOGIN
    @PostMapping(path="/login", consumes = {"application/json"})
    public String[] login(@Validated @RequestBody Account loginAccount) {

        // Check account exists
        String number = loginAccount.getNumber();
        if (!accountsRepository.existsAccountByNumber(number))
            throw new EntityNotFoundException("The phone number or password entered was incorrect.\n\nPlease ensure you have enter them correctly and try again.");

        // Get Data
        Account existingAccount = accountsRepository.findByNumber(number);
        String id = existingAccount.getAccountID().toString();
        String role = existingAccount.getRole();

        // Verify Password and return response
        if (existingAccount.getPassword().equals(loginAccount.getPassword())) {
            String[] response = {id, role};
            return response;
        }
        // Throw error if credentials are incorrect
        else throw new EntityNotFoundException("The phone number or password entered was incorrect.\n\nPlease ensure you have enter them correctly and try again.");
    }
}
