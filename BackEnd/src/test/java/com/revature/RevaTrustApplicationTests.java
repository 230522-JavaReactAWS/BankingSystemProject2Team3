package com.revature;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.revature.daos.AccountDAO;
import com.revature.daos.CustomerDAO;
import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.services.AccountService;
import com.revature.services.CustomerService;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
@SpringBootTest
@ExtendWith(MockitoExtension.class)
class RevaTrustApplicationTests {

    @Mock
    CustomerDAO customerDAO;

    @Mock
    AccountDAO accountDAO;
    @InjectMocks
    CustomerService sut;
    @InjectMocks
    AccountService sut2;

    @Test
    public void test_givenGetAllCustomers_ReturnAllAvailableCustomers() {
        List<Customer> customerList = new ArrayList<>();
        Customer customer1 = new Customer();
        Customer customer2 = new Customer();
        Customer customer3 = new Customer();
        customerList.add(customer1);
        customerList.add(customer2);
        customerList.add(customer3);
        when(customerDAO.findAll()).thenReturn(customerList);
        CustomerService sut = new CustomerService(customerDAO); // Manually create instance
        int actualSize = sut.getAllCustomers().size();
        verify(customerDAO, times(1)).findAll();
        verifyNoMoreInteractions(customerDAO);
        assertEquals(3, actualSize);
    }

    @Test
    public void test_givenGetAllCustomerAccounts_ReturnAllAvailableCustomerAccounts() {
        List<Account> accountList = new ArrayList<>();
        Account account1 = new Account();
        Account account2 = new Account();
        Account account3 = new Account();
        accountList.add(account1);
        accountList.add(account2);
        accountList.add(account3);
        when(accountDAO.findAll()).thenReturn(accountList);
        AccountService sut2 = new AccountService(accountDAO); // Manually create instance
        int actualSize = sut2.getAllAccounts().size();
        verify(accountDAO, times(1)).findAll();
        verifyNoMoreInteractions(accountDAO);
        assertEquals(3, actualSize);
    }

    @Test
    void contextLoads() {
    }

    String testMessage = "JUnit Test message";

    @Test
    public void testMessage() {
        System.out.println("Message Printed Successfully");
        assertEquals(testMessage, "JUnit Test message");
    }
}

