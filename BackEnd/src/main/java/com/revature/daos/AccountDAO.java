package com.revature.daos;

import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDAO extends JpaRepository<Account, Integer> {

    List<Account> findByCustomer(Customer c);

    List<Account> findByStatus(Status status);
}
