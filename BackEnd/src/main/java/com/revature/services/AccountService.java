package com.revature.services;

import com.revature.daos.AccountDAO;
import com.revature.models.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountDAO accountDAO;

    @Autowired
    public AccountService(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    public List<Account> getAllAccounts(){ return accountDAO.findAll(); }

    //TODO:Account not found Exception
    public Account getAccountById(int id){ return accountDAO.findById(id).orElseThrow(); }

    public Account createAccount(Account account){ return accountDAO.save(account); }
}
