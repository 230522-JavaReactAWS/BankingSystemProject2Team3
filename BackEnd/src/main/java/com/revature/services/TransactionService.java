package com.revature.services;

import com.revature.daos.AccountDAO;
import com.revature.daos.CustomerDAO;
import com.revature.daos.StatusDAO;
import com.revature.daos.TransactionDAO;
import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.models.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionDAO transactionDAO;
    private final AccountDAO accountDAO;
    private final CustomerDAO customerDAO;
    private final StatusDAO statusDAO;

    @Autowired
    public TransactionService(TransactionDAO transactionDAO, AccountDAO accountDAO, CustomerDAO customerDAO, StatusDAO statusDAO) {
        this.transactionDAO = transactionDAO;
        this.accountDAO = accountDAO;
        this.customerDAO = customerDAO;
        this.statusDAO = statusDAO;
    }

    public List<Transaction> getAllTransactions(){ return transactionDAO.findAll(); }

    public List<Transaction> getCustomerTransactions(Customer c){ return transactionDAO.findByCustomer(c); }

    public Transaction getTransactionById(int id){ return transactionDAO.findById(id).orElseThrow(); }

    //Different Methods of creating transactions
    //All functionality involving an account should create a new transaction
    //TODO: validate account types before transaction

    //Open any account
    public Transaction openAccount(float startingBalance, String type, String username){

        //Find customer
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

        //if Credit or loan, Create new account with type, lendingAmount = startingBalance, found customer and pending status
        if( type.toUpperCase().equals("CREDIT") || type.toUpperCase().equals("LOAN")){
            Account newAccount = new Account(
                    type.toUpperCase(),
                    startingBalance,
                    statusDAO.findByStatusName("Pending"),
                    targetCustomer
            );
            newAccount = accountDAO.save(newAccount);

            //Create new transaction with account
            Transaction newTransaction = transactionDAO.save( new Transaction(
                    "Open",
                    startingBalance,
                    targetCustomer,
                    newAccount,
                    type.toUpperCase().equals("CREDIT")?"Opened new " + type + " account with limit: " + startingBalance
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
                targetCustomer,
                newAccount,
                "Opened new " + type + " account with starting balance: " + startingBalance
        ));
        return newTransaction;
    }

    //One account deposit
    //TODO: Cannot deposit in credit or loan type
    public Transaction deposit(float amount, int aid, String username){

        //Find customer
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

        //Find account, then deposit amount
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.deposit(amount);

        //Create transaction with amount, type, account(origin and target are the same), description
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Income",
                amount,
                targetCustomer,
                targetAccount,
                "Deposited " + amount + " to Account: " + targetAccount.getId()
        ));

        return newTransaction;
    }

    //One account withdrawal
    //TODO: Cannot withdraw from credit
    public Transaction withdrawal(float amount, int aid, String username){

        //Find customer
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

        //Find account, then withdrawal amount
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.withdrawal(amount);

        //Create transaction with amount, type, account(origin and target are the same)
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Expense",
                amount,
                targetCustomer,
                targetAccount,
                "Withdrew " + amount + " from Account: " + targetAccount.getId()
        ));
        return newTransaction;
    }

    //Transfer between checking or savings accounts
    //transfer amount, origin account, target account
    //TODO: target cannot be loan type
    public Transaction transfer(float amount, int oid,int tid, String username){

        //Find customer
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

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
                targetCustomer,
                originAccount,
                targetAccount,
                "Tranferred " + amount + " from " + originAccount.getType() + " Account: " + originAccount.getId() + " to " + targetAccount.getType() + " " + targetAccount.getId()
        ));
        return newTransaction;
    }

    //Payment to lending account
    //payment amount, target account
    //TODO: Must be credit or loan account
    public Transaction lendingPayment(float amount, int aid, String username){

        //Find customer
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

        //Find Lending account, execute payment
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.payment(amount);

        //Create transaction with amount, account,
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Payment",
                amount,
                targetCustomer,
                targetAccount,
                "Paid " + amount + " to " + targetAccount.getType() + " Account: " + targetAccount.getId()
        ));

        return newTransaction;
    }

    //Charge a credit card
    //TODO: Must be credit account
    public Transaction creditCharge(float amount, int aid, String username){

        //Find customer
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

        //Find account, execute charge
        Account targetAccount = accountDAO.findById(aid).orElseThrow();
        targetAccount.charge(amount);

        //Create transaction with amount and account
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Expense",
                amount,
                targetCustomer,
                targetAccount,
                "Charged " + amount + " to " + targetAccount.getType() + "Account: " + targetAccount.getId()
        ));

        return newTransaction;
    }

    //Lending account status update
    //method needs id of account and new status
    //TODO: Must be credit or loan account
    public Transaction updateStatus(int id, String status, String username){

        //Find manager
        Customer targetCustomer = customerDAO.findByUsername(username).orElseThrow();

        //find account, execute status update
        Account target = accountDAO.findById(id).orElseThrow();
        target.setStatus(statusDAO.findByStatusName(status));

        //create new transaction with account and status
        Transaction newTransaction = transactionDAO.save(new Transaction(
                "Status",
                0,
                targetCustomer,
                target,
                //If Approved or else
                status.equals("Approved")?target.getType() + " Account " + target.getId() + " has been approved for " + target.getLendingAmount()
                        :target.getType() + " Account " + target.getId() + " has been denied"
        ));

        return newTransaction;

    }

}
