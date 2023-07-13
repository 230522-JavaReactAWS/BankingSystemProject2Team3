package com.revature.controllers;

import com.revature.models.Account;
import com.revature.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("accounts")
@CrossOrigin(origins = {"http://localhost:3000", "http://my-project2-bucket.s3-website-us-east-1.amazonaws.com" })
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("{id}")
    //Get one account
    public Account getAccountByIdHandler(@PathVariable("id") int id){ return accountService.getAccountById(id); }

}
