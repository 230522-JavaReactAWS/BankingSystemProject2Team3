package com.revature.controllers;

import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customers")
@CrossOrigin(origins = {"http://localhost:3000", "http://my-project2-bucket.s3-website-us-east-1.amazonaws.com" })
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("{id}")
    //Get one customer
    public Customer getCustomerByIdHandler(@PathVariable("id") int id){ return customerService.getCustomerById(id); }

    @GetMapping("{id}/accounts")
    //Get list of customer's accounts
    public List<Account> getCustomerAccountsHandler(@PathVariable("id") int id){ return customerService.getCustomerAccounts(id); }

    @PutMapping
    //Update a customer's info
    public Customer updateCustomerHandler(@RequestBody Customer c){ return customerService.updateCustomer(c); }

}
