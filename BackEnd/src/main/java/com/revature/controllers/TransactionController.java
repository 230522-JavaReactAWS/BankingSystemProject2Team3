package com.revature.controllers;

import com.revature.models.Customer;
import com.revature.models.Transaction;
import com.revature.security.JwtGenerator;
import com.revature.services.CustomerService;
import com.revature.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transactions")
@CrossOrigin("http://localhost:3000")
public class TransactionController {

    private final TransactionService transactionService;

    private final CustomerService customerService;

    private final JwtGenerator jwtGenerator;

    @Autowired
    public TransactionController(TransactionService transactionService, CustomerService customerService, JwtGenerator jwtGenerator) {
        this.transactionService = transactionService;
        this.customerService = customerService;
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping
    //Get All transactions
    public List<Transaction> getAllTransactionsHandler(){
        return transactionService.getAllTransactions();
    }

    @GetMapping("{id}")
    //Get one transaction
    public Transaction getTransactionByIdHandler(@PathVariable("id") int id){
        return transactionService.getTransactionById(id);
    }

    //The rest are post methods because transactions are created to trigger other actions
    @PostMapping("/open/{type}/{balance}")
    //Open an account
    public Transaction openAccountHandler(@PathVariable("type") String type,
                                   @PathVariable("balance") float balance,
                                   @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate type
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.openAccount(balance,type,username);
    }

    @PostMapping("deposit/{aid}/{amount}")
    //One account deposit
    public Transaction depositHandler(@PathVariable("aid")int aid,
                                      @PathVariable("amount")float amount,
                                      @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate amount
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.deposit(amount,aid,username);
    }

    @PostMapping("withdrawal/{aid}/{amount}")
    //One account withdrawal
    public Transaction withdrawalHandler(@PathVariable("aid")int aid,
                                      @PathVariable("amount")float amount,
                                      @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate amount
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.withdrawal(amount,aid,username);
    }

    @PostMapping("transfer/{oid}/{tid}/{amount}")
    //Transfer between 2 accounts
    public Transaction transferHandler(@PathVariable("oid")int oid,
                                       @PathVariable("tid")int tid,
                                       @PathVariable("amount")float amount,
                                       @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate amount
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.transfer(amount,oid,tid,username);
    }

    @PostMapping("payment/{id}/{amount}")
    //Payment to lending account
    public Transaction paymentHandler(@PathVariable("id")int id,
                                      @PathVariable("amount")float amount,
                                      @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate amount
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.lendingPayment(amount,id,username);
    }

    @PostMapping("charge/{id}/{amount}")
    //Credit card charge
    public Transaction chargeHandler(@PathVariable("id")int id,
                                     @PathVariable("amount")float amount,
                                     @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate amount
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.creditCharge(amount,id,username);
    }

    @PostMapping("status/{id}/{status}")
    //Update Status of credit or loan
    public Transaction updateStatus(@PathVariable("id")int id,
                                    @PathVariable("status")String status,
                                    @RequestHeader("Authorization") String token){

        //extract username from token
        //TODO: Validate amount
        //TODO: jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) )
        String username = jwtGenerator.getUsernameFromToken( token.substring( 7, token.length() ) );

        return transactionService.updateStatus(id,status,username);
    }

}
