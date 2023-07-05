package com.revature.services;

import com.revature.daos.AccountDAO;
import com.revature.daos.CustomerDAO;
import com.revature.daos.StatusDAO;
import com.revature.daos.TransactionDAO;
import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.models.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionDAO transactionDAO;
    private final AccountDAO accountDAO;
    private final CustomerDAO customerDAO;
    private final StatusDAO statusDAO;

    public TransactionService(TransactionDAO transactionDAO, AccountDAO accountDAO, CustomerDAO customerDAO, StatusDAO statusDAO) {
        this.transactionDAO = transactionDAO;
        this.accountDAO = accountDAO;
        this.customerDAO = customerDAO;
        this.statusDAO = statusDAO;
    }

    public List<Transaction> getAllTransactions(){ return transactionDAO.findAll(); }

    //Different Methods of creating transactions
    //All functionality involving an account should create a new transaction
    //TODO: validate account types before transaction

    //Open any account
    public Transaction openAccount(float startingBalance, String type, int cid){

        //Find customer
        Customer targetCustomer = customerDAO.findById(cid).orElseThrow();

        //if Credit or loan, Create new account with type, lendingAmount = startingBalance, found customer and pending status
        if( type.equals("CREDIT") || type.equals("LOAN")){
            Account newAccount = new Account(
                    type,
                    startingBalance,
                    statusDAO.findByStatusName("PENDING"),
                    targetCustomer
            );
            newAccount = accountDAO.save(newAccount);

            //Create new transaction with account
            Transaction newTransaction = transactionDAO.save( new Transaction(
                    "Open",
                    startingBalance,
                    newAccount,
                    type.equals("Credit")?"Opened new " + type + " account with limit: " + startingBalance
                            :"Opened new " + type + " account borrowing: " + startingBalance
            ));
            return newTransaction;

        }

        //Create new account with type, balance, and found customer
        Account newAccount = new Account(
                type,
                startingBalance,
                targetCustomer
        );
        newAccount = accountDAO.save(newAccount);

        //Create new transaction with account
        Transaction newTransaction = transactionDAO.save( new Transaction(
                "Open",
                startingBalance,
                newAccount,
                "Opened new " + type + " account with starting balance: " + startingBalance
        ));
        return newTransaction;
    }

    //One account deposit
    //TODO: Cannot deposit in credit or loan type
    public Transaction deposit(float amount, int aid){

        //Find account, then deposit amount
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.deposit(amount);

        //Create transaction with amount, type, account(origin and target are the same), description
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Deposit",
                amount,
                targetAccount,
                "Deposited " + amount + " to Account: " + targetAccount.getId()
        ));

        return newTransaction;
    }

    //One account withdrawal
    //TODO: Cannot withdraw from credit
    public Transaction withdrawal(float amount, int aid){

        //Find account, then withdrawal amount
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.withdrawal(amount);

        //Create transaction with amount, type, account(origin and target are the same)
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Witdrawal",
                amount,
                targetAccount,
                "Withdrew " + amount + " from Account: " + targetAccount.getId()
        ));
        return newTransaction;
    }

    //Transfer between checking or savings accounts
    //transfer amount, origin account, target account
    //TODO: target cannot be loan type
    public Transaction transfer(float amount, int oid,int tid){

        //find both accounts
        Account originAccount = accountDAO.findById(oid).orElseThrow();
        Account targetAccount = accountDAO.findById(tid).orElseThrow();

        //withdrawal from origin account, deposit to target
        originAccount.withdrawal(amount);
        targetAccount.deposit(amount);

        //Create transaction with amount, origin account, target account, description
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Transfer",
                amount,
                originAccount,
                targetAccount,
                "Tranferred " + amount + " from " + originAccount.getType() + " Account: " + originAccount.getId() + " to " + targetAccount.getType() + " " + targetAccount.getId()
        ));
        return newTransaction;
    }

    //Payment to lending account
    //payment amount, target account
    public Transaction lendingPayment(float amount, int aid){
        //Find Lending account, execute payment
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.payment(amount);

        //Create transaction with amount, account,
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Payment",
                amount,
                targetAccount,
                "Paid " + amount + " to " + targetAccount.getType() + "Account: " + targetAccount.getId()
        ));

        return newTransaction;
    }

    //Charge a credit card
    public Transaction creditCharge(float amount, int aid){
        //Find account, execute charge
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.charge(amount);

        //Create transaction with amount and account
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Charge",
                amount,
                targetAccount,
                "Charged " + amount + " to " + targetAccount.getType() + "Account: " + targetAccount.getId()
        ));

        return newTransaction;
    }

    //Lending account status update
    //method needs id of account and new status
    public Transaction updateStatus(int id, String status){
        //find account, execute status update
        Account target = accountDAO.findById(id).orElseThrow();
        target.setStatus(statusDAO.findByStatusName(status));

        //create new transaction with account and status
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Status",
                0,
                target,
                target.getType() + " Account " + target.getId() + " has been approved for " + target.getLendingAmount()
        ));

        return newTransaction;

    }

}
