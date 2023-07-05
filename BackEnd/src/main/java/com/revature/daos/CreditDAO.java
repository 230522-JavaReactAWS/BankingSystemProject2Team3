package com.revature.daos;

import com.revature.models.Account;
import com.revature.models.Credit;
import com.revature.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditDAO extends JpaRepository<Credit, Integer> {

    List<Credit> findByCustomer(Customer c);
}
