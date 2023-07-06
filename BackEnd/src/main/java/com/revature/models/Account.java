package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Optional;

@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "accounts")
public class Account {

    //A model for accounts
    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //Checking, Savings, Investment, Credit, Loan
    @Column(name = "account_type")
    private String type;

    private float balance;

    @Column(name = "lending_amount")
    private float lendingAmount;

    //Many accounts have one status PENDING, APPROVED, or DENIED
    @ManyToOne
    @JoinColumn(name="status_id_fk")
    private Status status;


    //Many accounts are owned by one customer
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="customer_id_fk")
    private Customer customer;

    public Account(String type, float startingBalance, Customer customer) {
        this.type = type;
        this.balance = startingBalance;
        this.customer = customer;
    }

    //Constructor for lending accounts: CREDIT or LOAN
    //Checking and savings will never need status
    public Account(String type, float startingBalance, Status pending, Customer targetCustomer) {
        this.type = type;
        //credit account must start with balance at 0
        if ( type.equals("CREDIT") ){
            this.balance = 0;
        //for loan, balance starts at startingBalance to be available funds
        } else { this.balance = startingBalance; }

        //For credit lendingAmount is the limit, for loan lendingAmount is balance to be paid
        this.lendingAmount = startingBalance;

        //Both start with pending status
        this.status = pending;
        this.customer = targetCustomer;
    }

    //Method for adding money to checking or savings account
    public void deposit(float amount){ this.balance += amount; }

    //Method for withdrawal from account
    public boolean withdrawal(float amount){
        //If the balance is less than the withdrawal return false
        if( this.balance < amount ){
            return false;
        }
        this.balance -= amount;
        return true;
    }

    //Method for charge to credit account
    public boolean charge(float amount){
        //if credit type, amount is added to balance, other type return false
        if( this.type.equals("CREDIT") ){
            //if the credit charge amount and the balance is greater than the lending amount (limit) return false
            if ( this.balance + amount > this.lendingAmount ){
                return false;
            }
            this.balance += amount;
        } else return false;
        return true;
    }

    //Method for payment to lending account
    public boolean payment(float amount){

        //if the payment amount is greater than the lending amount/limit return false
        if( amount > this.lendingAmount ){
            return false;
        }
        //if credit type, payment means the amount is subtracted from the balance
        if( this.type.equals("CREDIT") ){
            //if the credit payment amount is greater than the balance return false
            if ( amount > this.balance ){
                return false;
            }
            this.balance -= amount;
        }

        //if loan type, payment means the payment amount is subtracted from the lending amount
        if( this.type.equals("LOAN") ){
            //if the payment amount is greater than the lending amount return false
            if ( amount > lendingAmount ){
                return false;
            }
            this.lendingAmount -= amount;
        }
        return true;
    }
}
