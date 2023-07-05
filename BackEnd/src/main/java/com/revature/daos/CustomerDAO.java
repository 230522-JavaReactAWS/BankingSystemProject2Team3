package com.revature.daos;

import com.revature.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerDAO extends JpaRepository<Customer, Integer> {
    Optional<Customer>findByUsername(String username);
}
