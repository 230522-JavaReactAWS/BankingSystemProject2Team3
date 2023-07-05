package com.revature.models;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "applications")
public class Credit {

    //A model for credit accounts
    @Id
    @Column(name = "application_id") // allows you to alter the column
    @GeneratedValue(strategy = GenerationType.IDENTITY)// We want this to be a serial field so let's make it one
    private int id;

    //CREDIT OR LOAN
    @Column(name = "application_type")
    private String type;

    //For Credit lendingAmount is the limit, the balance is charges to the card
    //For Loan the lendingAmount is the loan amount, the balance is how much is leftover
    @Column(name = "application_amount")
    private float lendingAmount;

    private float balance;

    //Many have one status PENDING, APPROVED, or DENIED
    @ManyToOne
    private Status status;

    //Many accounts are owned by one customer
    @ManyToOne
    @JoinColumn(name="customer_id_fk")
    private Customer customer;

    //Method for charge to lending account
    public boolean charge(float amount){
        //if credit type, amount is added to balance
        if( this.type.equals("CREDIT") ){
            //if the credit charge amount and the balance is greater than the lending amount (limit) return false
            if ( this.balance + amount > this.lendingAmount ){
                return false;
            }
            this.balance += amount;
        }

        //if loan type, amount is subtracted from balance
        if( this.type.equals("LOAN") ){
            //if the amount is greater than the balance return false
            if( amount > this.balance ){
                return false;
            }
            this.balance -= amount;
        }
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
