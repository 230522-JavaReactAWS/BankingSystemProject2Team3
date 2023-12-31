package com.revature.models;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;
import java.util.Optional;

@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transaction {

    //This model will track all transactions that happen
    //A transaction is requested, its creation triggers the account deposit or withdrawal while the object is being instantiated,
    // thus tracking the transaction time with the
    @Id
    @Column(name = "transaction_id") // allows you to alter the column
    @GeneratedValue(strategy = GenerationType.IDENTITY)// We want this to be a serial field so let's make it one
    private int id;

    //Either withdrawal or deposit
    @Column(name = "transaction_type")
    private String type;

    private float amount;

    private String description;

    //Customer who initiated transaction
    @ManyToOne
    @JoinColumn(name="customer_id")
    private Customer customer;

    //The origin account of the transaction.
    @ManyToOne
    @JoinColumn(name="origin_id")
    private Account origin;

    //In most cases the same as the origin
    //In some cases between two accounts from one customer
    //Or accounts between two customers
    @ManyToOne
    @JoinColumn(name="target_id")
    private Account target;

    //Used to track when transaction happened
    @Column(name="created_at",updatable=false)
    private Date createdAt;

    public Transaction(String type, float amount, String description, Customer customer, Account origin, Account target, Date createdAt) {
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.customer = customer;
        this.origin = origin;
        this.target = target;
        this.createdAt = new Date();
    }

    public Transaction(String type, float amount, Customer customer, Account account, String description) {
        this.type = type;
        this.amount = amount;
        this.customer = customer;
        this.origin = account;
        this.target = null;
        this.description = description;
        this.createdAt = new Date();
    }

    public Transaction(String type, float amount, Customer customer, Account originAccount, Account targetAccount, String description) {
        this.type = type;
        this.amount = amount;
        this.customer = customer;
        this.origin = originAccount;
        this.target = targetAccount;
        this.description = description;
        this.createdAt = new Date();
    }
}
