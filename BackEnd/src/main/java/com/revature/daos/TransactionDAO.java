package com.revature.daos;

import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDAO extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByOrigin(Account account);

    List<Transaction> findByCustomer(Customer customer);
}
