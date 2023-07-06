package com.revature.services;

import com.revature.daos.CustomerDAO;
import com.revature.models.Account;
import com.revature.models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomerService(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    public List<Customer> getAllCustomers(){ return customerDAO.findAll(); }

    public Customer getCustomerById(int id){ return customerDAO.findById(id).orElseThrow(); }

    public Customer getCustomerByUsername(String username){ return customerDAO.findByUsername(username).orElseThrow(); }

    public Customer createCustomer(Customer customer){
        Customer newCustomer = customerDAO.save(customer);
        return newCustomer;
    }

    public Customer updateCustomer(Customer customer){ return customerDAO.save(customer);}

    public List<Account> getCustomerAccounts(int id){
        //Find customer
        Optional<Customer> targetCustomer = customerDAO.findById(id);

        //if customer does not exist return empty List
        if(!targetCustomer.isPresent() ){
            return Collections.emptyList();
        }
        return targetCustomer.get().getAccounts();
    }
}
