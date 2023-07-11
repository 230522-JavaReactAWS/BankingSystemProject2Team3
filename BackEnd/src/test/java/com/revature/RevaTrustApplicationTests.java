package com.revature;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.revature.daos.AccountDAO;
import com.revature.daos.CustomerDAO;
import com.revature.models.Account;
import com.revature.models.Customer;
import com.revature.services.AccountService;
import com.revature.services.CustomerService;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
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
	public void test_givenGetAllCustomers_ReturnAllAvailableCustomers(){
		List<Customer> customerList = new ArrayList<>();
		Customer customer1 = new Customer();
		Customer customer2 = new Customer();
		Customer customer3 = new Customer();
		customerList.add(customer1);
		customerList.add(customer2);
		customerList.add(customer3);
		when(customerDAO.findAll()).thenReturn(customerList);
		int actualSize =sut.getAllCustomers().size();
		verify(customerDAO, times(1)).findAll();
		verifyNoMoreInteractions(customerDAO);
		Assertions.assertEquals(1, actualSize);
	}
@Test
	public void test_givenGetAllCustomerAccounts_ReturnAllAvailableCustomerAccounts(){
		List<Account> accountList = new ArrayList<>();
		Account account1 = new Account();
		Account account2 = new Account();
		Account account3 = new Account();
		accountList.add(account1);
		accountList.add(account2);
		accountList.add(account3);
		when(accountDAO.findAll()).thenReturn(accountList);
		int actualSize =sut2.getAllAccounts().size();
		verify(accountDAO, times(1)).findAll();
		verifyNoMoreInteractions(accountDAO);
		Assertions.assertEquals(1, actualSize);
	}
	@Test
	void contextLoads() {
	}

}
