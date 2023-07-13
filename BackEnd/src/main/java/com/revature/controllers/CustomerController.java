package com.revature.controllers;

import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.security.JwtGenerator;
import com.revature.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customers")
@CrossOrigin("http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;

    private final JwtGenerator jwtGenerator;

    @Autowired
    public CustomerController(CustomerService customerService, JwtGenerator jwtGenerator) {
        this.customerService = customerService;
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping("{id}")
    //Get one customer
    public Customer getCustomerByIdHandler(@PathVariable("id") int id){ return customerService.getCustomerById(id); }

    @GetMapping("username/{username}")
    //Get one customer
    public Customer getCustomerByUsernameHandler(@PathVariable("username") String username,
                                           @RequestHeader("Authorization") String token){
        if ( username.equals( jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) ) )){
            return customerService.getCustomerByUsername(username);
        }
        return null;
    }

    @GetMapping("{id}/accounts")
    //Get list of customer's accounts
    public List<Account> getCustomerAccountsHandler(@PathVariable("id") int id){ return customerService.getCustomerAccounts(id); }

    @PutMapping
    //Update a customer's info
    public Customer updateCustomerHandler(@RequestBody Customer c){ return customerService.updateCustomer(c); }

}
